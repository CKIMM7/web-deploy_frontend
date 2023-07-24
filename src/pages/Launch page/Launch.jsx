import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import axios from 'axios';
import Form from './Form';
import Repos from './Repos';

export default function Launch() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  return <div>

      {user.access_id ? 
      <div>
        <Form></Form>
        <Repos></Repos>
      </div>
      : 
      <div>
        <p>you currently do not have AWS credentials</p>
        <Link to="/account">click here to get AWS credentials</Link>
        </div>
    }
    

  </div>
}
