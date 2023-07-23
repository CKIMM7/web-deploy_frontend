import { useDispatch, useSelector } from 'react-redux';

import Nav from "./Nav";
import About from "./About";
import ExtraFeatures from "./ExtraFeatures";
import SupportedLanguages from "./SuppotedLanguages";


export default function Landing() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const error = useSelector(state => state.user.error); 

  return <div>
    <Nav></Nav>
    <About></About>
    <SupportedLanguages></SupportedLanguages>
    <ExtraFeatures></ExtraFeatures>
    {error && <p>{error}</p>}
    <p>{process.env.REACT_APP_URL}</p>
  </div>
}
