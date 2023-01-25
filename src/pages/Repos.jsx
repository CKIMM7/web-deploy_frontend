import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import useGetRepos from "../API/useGetRepos";
import LoadingSpinner from "./LoadingSpinner";

const Repos = () => {
    useGetRepos()
    const isLoading = useSelector((state) => state.user.isLoading);
    const textInput = useSelector((state) => state.user.textInput);
    const isError = useSelector((state) => state.user.isError);
    const error = useSelector((state) => state.user.error);
    const searchArray = useSelector(state => state.user.searchArray)

    let displayError =  <>
    <h1>error message:</h1>
    <p>{error.message}</p>
    <p>put in the right user name</p>
  </>



  const repos = searchArray.map((repo, i) => {
    return <div key={i}>
        <p>repo</p>
    </div>
 })

  let content = searchArray.length === 0 && textInput && !isLoading ? <h1>no repos for this user</h1> :  repos

    return(
        <div>
            {!textInput && !isLoading && <img src='https://student-server-bucket.s3.amazonaws.com/github_logo.png' /> } 
            {!isError && content}
            {isError && displayError}
            {isLoading && textInput && <h1 id="loading">SEACHING FOR REPOS...</h1>}
        </div>
    )
}

export default Repos
