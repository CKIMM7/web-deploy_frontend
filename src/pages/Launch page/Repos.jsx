import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import useGetRepos from "../../API/useGetRepos";
import { userActions } from "../../store/store";
import LoadingSpinner from "../LoadingSpinner";

import classes from './Repos.module.css'

import axios from "axios";

const Repos = () => {
    useGetRepos()
    const isLoading = useSelector((state) => state.user.isLoading);
    const textInput = useSelector((state) => state.user.textInput);
    const isError = useSelector((state) => state.user.isError);
    const error = useSelector((state) => state.user.error);
    const searchArray = useSelector(state => state.user.searchArray)

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()


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
      console.log(s.data.message)
      let ec2Id = s.data.message
      let newUser = { ...user }
      console.log(newUser)

      console.log(newUser.ec2_instances)
      
      console.log(newUser)
      dispatch(userActions.setUser(newUser))

    }).catch((e) => {
      console.log(e)
    })
    console.log(clone_url)
  }


  const repos = searchArray.map((repo, i) => {
    return <div key={i} className={classes.repo}>
            <div> 
              <img src={repo.owner.avatar_url} className={classes.repo_img}></img>
            </div> 
            <div className={classes.repo_text}>
              <h3>{repo.name}</h3>
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
        <div className={classes.repos_container}>
            {!textInput && !isLoading && <img src='https://student-server-bucket.s3.amazonaws.com/github_logo.png' /> } 
            {!isError && content}
            {isError && displayError}
            {isLoading && textInput && <h1 id="loading">SEACHING FOR REPOS...</h1>}
        </div>
    )
}

export default Repos
