import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import { auth } from "./firebase";

import Landing from "./pages/Landing Page/Landing";
import Deployments from "./pages/Deployments";
import Launch from "./pages/Launch page/Launch";

import axios from 'axios'

const headers = {
  "Access-Control-Allow-Origin": "*",
}

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

  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //console.log(user)
      console.log(user)

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
        console.log(user.data)
        dispatch(userActions.setUser(user.data.user))
    
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

    // <Routes>
    // <Route path='/' element={<Header></Header>}>
    // <Route path='/artist' element={<Artist></Artist>}></Route>
    // <Route path='/artist' element={<ec2></ec2>}></Route>
    // </Route>
    // </Routes>

    <Routes>
      {/* / */}
      <Route path='/' element={<Landing></Landing>}></Route>
      
      {/* /deployments */}
      <Route path='/deployments' element={<Deployments></Deployments>}></Route>
      

      {/* /launch */}
      <Route path='/launch' element={<Launch></Launch>}></Route>
      
      </Routes>
  );
}

export default App;

