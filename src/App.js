import React, { useEffect } from "react"

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const signInHandler = () => {
    dispatch(userActions.googleSignIn())
  }

  const signOutHandler = () => {
    dispatch(userActions.signOut())
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
        photoURL: user.photoURL,
        uid: user.uid
      }
      //console.log(user1)
      dispatch(userActions.setUser(user1))
    } else {
      dispatch(userActions.setUser(''))
    }

    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if(user) {console.log('cb: bring data from backend')
  } else {
    console.log('cb: user has signed out do something')
  }

  }, [user])


  return (
    <div>
      {user ? <div><p>user: {user.uid}</p>
              <img src={user.photoURL}></img>
              </div> 
      : <p>user is not signed in</p>}
      <button onClick={signInHandler}>sign in with google</button>
      <button onClick={signOutHandler}>sign out</button>
    </div>
  );
}

export default App;
