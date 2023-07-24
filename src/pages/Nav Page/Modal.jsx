import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import { Link } from 'react-router-dom';
import classes from './Modal.module.css'

export default function Modal() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const signOutHandler = () => {
      dispatch(userActions.signOut())
    }

  return (
  <div className={classes.dropdown_container}>
  <Link to="/">Home</Link>
  <Link to="/launch">Launch</Link>
  <Link to="/deployments">Deployments</Link>
  <Link to="/account">Account</Link>
  <button onClick={signOutHandler} className={classes.button_login}>Log out</button>
  </div>
  )
}

