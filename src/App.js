import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import { auth } from "./firebase";

import Landing from "./pages/Landing Page/Landing";
import Launch from "./pages/Launch page/Launch";
import Deployments from "./pages/Deployments";
import Account from "./pages/Account Page/Account";

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

      {/* /launch */}
      <Route path='/launch' element={<Launch></Launch>}></Route>

      {/* /deployments */}
      <Route path='/deployments' element={<Deployments></Deployments>}></Route>
      
      {/* /deployments */}
      <Route path='/account' element={<Account></Account>}></Route>
      


      
      </Routes>
  );
}

export default App;

