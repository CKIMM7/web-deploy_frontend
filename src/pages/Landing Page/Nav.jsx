import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import axios from 'axios';

export default function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const signInHandler = () => {
    dispatch(userActions.googleSignIn())
  }

  const signOutHandler = () => {
    dispatch(userActions.signOut())
  }

  const createAwsUser = () => {
    axios.post(`${process.env.REACT_APP_URL}/iam/new`, {
        name: user.name,
        guid: user.guid
      }).then((s) => {
        console.log(s)

        let newUser = { ...user }
        newUser.access_id = s.data.user.access_id
        newUser.secret_id = s.data.user.secret_id
                
        dispatch(userActions.setUser(newUser))

      }).catch((e) => {
        console.log(e)

        dispatch(userActions.setError(e.response.data.message))
        setTimeout(function(){
        dispatch(userActions.setError(''))
        }, 3000); 

      })
  }

  return <div>
    <div className='auth-container'>
        
        {user ? <div><p className='auth'>Hello {user.email}</p>
                <img src={user.photo}></img>
                </div> 
        : <button onClick={signInHandler} className='auth'>Log in</button>}
        
        {user && <button onClick={signOutHandler} className='auth'>sign out</button>}
  
        {user.id && <button onClick={createAwsUser} className='auth'>create aws user</button>}
        {user.access_id ? <p>Access Id: {user.access_id}</p> : <p>No userAccessId</p>}
        {user.secret_id ? <p>Secret Id: {user.secret_id}</p> : <p>No userSecretId</p>}
  
      </div>
  </div>
}
