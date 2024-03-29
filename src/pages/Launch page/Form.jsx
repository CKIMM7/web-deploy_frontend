import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';


export default function Form() {
    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.user.textInput)
    const searchValue = useSelector((state) => state.user.searchValue);

    function handleChange (e) {
        console.log(e.target.value)
        dispatch(userActions.setTextInput(e.target.value))
    }

    function handleSumbit(e) {
        e.preventDefault();
        dispatch(userActions.setSearchValue(textInput))
    }
    
  return (
      <form onSubmit={handleSumbit} id="searchForm">
              {/* <label htmlFor="form-search">Search For Artists</label> */}
              <input name={searchValue} type='text' value={textInput} onChange={handleChange} id="form-search" placeholder='Type in username'/>

              {/* <input type='submit' id='button'/> */}
          </form>
  )
}
