import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';


import Modal from "./Modal";
import classes from "./Nav.module.css"

export default function Nav() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [modal, setModal] = useState(false)

  const signInHandler = () => {
    dispatch(userActions.googleSignIn())
  }

  return <div>
    <div className={classes.nav_container}>
        <h3 className={classes.logo}>WebDeploy</h3>
        {user ? 
        <div>
          <img 
            src={user.photo} 
            className={classes.profile_img}
            onMouseEnter={() => setModal(true)}
            onMouseLeave={() => setModal(false)}>
            </img>
          {modal && <Modal></Modal>}
        </div> 
        : <div>
          <button onClick={signInHandler} className={classes.button_login}>Log in</button>
        </div>}

      </div>
  </div>
}
