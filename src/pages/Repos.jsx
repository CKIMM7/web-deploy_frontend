import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import useGetRepos from "../API/useGetRepos";
import LoadingSpinner from "./LoadingSpinner";

import axios from "axios";

const Repos = () => {
    useGetRepos()
    const isLoading = useSelector((state) => state.user.isLoading);
    const textInput = useSelector((state) => state.user.textInput);
    const isError = useSelector((state) => state.user.isError);
    const error = useSelector((state) => state.user.error);
    const searchArray = useSelector(state => state.user.searchArray)

    const user = useSelector(state => state.user.user);


    let displayError =  <>
    <h1>error message:</h1>
    <p>{error.message}</p>
    <p>put in the right user name</p>
  </>

const ec2launchHandler = (clone_url) => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/create`, {
      name: user.name,
      guid: user.guid,
      repo: clone_url
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
    console.log(clone_url)
  }


  const repos = searchArray.map((repo, i) => {
    return <div key={i}>
            <h1>repo name:  {repo.name}</h1>
            <div id="img"> 
            <img src={repo.owner.avatar_url} width="400" height="400"></img>
                <p>{repo.owner.login}</p>
                <p>stargazer count:{repo.stargazers_count}</p>
                <p>visibility: {repo.visibility}</p>
                <a href={repo.html_url} target="_blank">Check It Out</a>

                <p onClick={() => {ec2launchHandler(repo.clone_url)}}> Deploy to AWS NOW!</p>
            </div>
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
