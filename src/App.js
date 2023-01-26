import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import { auth } from "./firebase";

import Repos from "./pages/Repos";
import Form from "./pages/Form";

import axios from 'axios'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const error = useSelector(state => state.user.error);

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
        newUser.access_id = s.data.userData.accessId
        newUser.secret_id = s.data.userData.secreId
        
        dispatch(userActions.setUser(newUser))

      }).catch((e) => {
        console.log(e)

        dispatch(userActions.setError(e.response.data.message))
        setTimeout(function(){
        dispatch(userActions.setError(''))
        }, 3000); 

      })
  }

  const ec2launchHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/create`, {
      name: user.name,
      guid: user.guid
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
  }

  const ec2StopHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/stop`, {
      name: user.name,
      guid: user.guid
    })
  }

  const ec2StartHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/start`, {
      name: user.name,
      guid: user.guid
    })
  }

  const ec2TerminateHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/terminate`, {
      name: user.name,
      guid: user.guid
    })
  }

  const viewYourServers = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/instances`, {
      name: user.name,
      guid: user.guid
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
  }

  const getEc2InstanceState = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/state`, {
      name: user.name,
      guid: user.guid
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //console.log(user)

      if(user) {
      
      let user1 = {
        accessToken: user.accessToken,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photo: user.photoURL,
        guid: user.uid
      }
      //console.log(user1)
      axios.post(`${process.env.REACT_APP_URL}/user`, {
        data: user1
      })
      .then((user) => {
        console.log(user);
        dispatch(userActions.setUser(user.data))
    
      })
      .catch((e) => {
        console.log(e)
      })


    } else {
      console.log('no user')
      dispatch(userActions.setUser(''))
    }

    })

    return unsubscribe
  }, [])




  return (
    <div>
      <div className='auth-container'>
      {user ? <div><p className='auth'>Hello {user.email}</p>
              <img src={user.photo}></img>
              </div> 
      : <button onClick={signInHandler} className='auth'>sign in with Google</button>}
      <button onClick={signOutHandler} className='auth'>sign out</button>
      {user.id && <button onClick={createAwsUser} className='auth'>create aws user</button>}
      {user.access_id ? <p>Access Id: {user.access_id}</p> : <p>No userAccessId</p>}
      {user.secret_id ? <p>Secret Id: {user.secret_id}</p> : <p>No userSecretId</p>}
    </div>

      <div className='ec2-container'>
        {user.id && <button onClick={ec2launchHandler} className='ec2'>Launch EC2 instance</button>}
        {user.id && <button onClick={ec2StopHandler} className='ec2'>Stop EC2 instance</button>}
        
        {user.id && <button onClick={ec2StartHandler} className='ec2'>Start EC2 instance</button>}

        {user.id && <button onClick={ec2TerminateHandler} className='ec2'>Terminate EC2 instance</button>}

        {user.id && <button onClick={viewYourServers} className='ec2'>View your servers</button>}
      </div>

      {/* {user.access_id && <p>{user.access_id}</p>}
      {user.secret_id && <p>{user.secret_id}</p>} */}
      {user.instance_id && 
      <div className='instances-container'>
        <div className='instance'>
          <p onClick={() => { getEc2InstanceState() }}>Instance ID: {user.instance_id}</p>
        </div>
      </div>}


      {user.access_id && <div className="repos">
        <Form></Form>
        <Repos></Repos>
      </div>}

      {error && <p>{error}</p>}
      <p>{process.env.REACT_APP_URL}</p>
    </div>
  );
}

export default App;
