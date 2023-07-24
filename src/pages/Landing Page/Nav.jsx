import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import axios from 'axios';
import classes from "./Nav.module.css"

export default function Nav() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const signInHandler = () => {
    dispatch(userActions.googleSignIn())
  }

  const signOutHandler = () => {
    dispatch(userActions.signOut())
  }


  return <div>
    <div className={classes.nav_container}>
        <h3 className={classes.logo}>WebDeploy</h3>
        {user ? <div>
                  {/* <p className='auth'>{user.email}</p> */}
                  <img src={user.photo} className={classes.profile_img}></img>
                </div> 
        : <div>
          <button onClick={signInHandler} className={classes.button_login}>Log in</button>
          <div className={classes.dropdown_container}>
        <Link to="/">Home</Link>
        <Link to="/launch">Launch</Link>
        <Link to="/deployments">Deployments</Link>
        <Link to="/account">Account</Link>
        <button onClick={signOutHandler} className={classes.button_login}>Log out</button>
      </div>
        </div>}

      </div>
  </div>
}
