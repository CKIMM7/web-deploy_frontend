import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import Repos from './Repos';

export default function Launch() {
  const user = useSelector(state => state.user.user);

  return <div>
      {user.access_id && 
    <div className="repos">
      <Form></Form>
      <Repos></Repos>
    </div>}
  </div>
}
