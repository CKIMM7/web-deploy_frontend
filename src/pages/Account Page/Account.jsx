import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import axios from 'axios';

import classes from './Account.module.css'

export default function Account() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const createAwsUser = () => {
      axios.post(`${process.env.REACT_APP_URL}/iam/new`, {
          name: user.name,
          guid: user.guid
        }).then((s) => {
          console.log(s)
  
          let newUser = { ...user }
          newUser.access_id = s.data.user.access_id
          newUser.secret_id = s.data.user.secret_id
          console.log('user with aws creds')
          console.log(newUser)
  
          dispatch(userActions.setUser(newUser))
  
        }).catch((e) => {
          console.log(e)
  
          dispatch(userActions.setError(e.response.data.message))
          setTimeout(function(){
          dispatch(userActions.setError(''))
          }, 3000); 
  
        })
    }

  return (
    <div>
      <div>Account Info</div>
      <div>
        <p className='auth'>{user.email}</p>
        <img src={user.photo} className={classes.profile_img}></img>
      </div>

        {user.id && <button onClick={createAwsUser} className='auth'>create aws user</button>}
        
        {user.access_id ? <p>Access Id: {user.access_id}</p> : <p>No userAccessId</p>}
        {user.secret_id ? <p>Secret Id: {user.secret_id}</p> : <p>No userSecretId</p>}
    </div> 

    
  )
}
