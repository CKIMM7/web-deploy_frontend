import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../store/store";

import axios from 'axios';

const useGetRepos = () => {
    
    const dispatch = useDispatch()

    const searchValue = useSelector((state) => state.user.searchValue);
    const textInput = useSelector((state) => state.user.textInput);

    useEffect(() => {

        console.log('useGetRepos')
        dispatch(userActions.setIsLoading(true))
        const controller = new AbortController();
        const { signal } = controller;

        function callGitHub () {

        axios.get(`https://api.github.com/users/ckimm7/repos`)
        .then(data => { 
            
            console.log(data)
            dispatch(userActions.setSearchArray(data.data))
            dispatch(userActions.setIsLoading(false))
            dispatch(userActions.setIsError(false))
        })
        .catch((err)=> {
            console.log(err)
            dispatch(userActions.setIsLoading(false))
            //signal.aborted happens when controller.abort() gets called
            //by the user therefore do not need to return the err msg
            if(signal.aborted) return;
            dispatch(userActions.setIsError(true))
            dispatch(userActions.setError({ message: err.message }))
        })
    }

        const timeOutId = setTimeout(() => {
            if(!textInput) {
            
            //init all
            dispatch(userActions.setSearchArray([]))
            dispatch(userActions.setIsLoading(false))
            dispatch(userActions.setIsError(false))  

            } else {
            callGitHub()
            }

        }
        , 1000);


        return () => { 
            console.log('comp unmount')

            clearTimeout(timeOutId);}    

    }, [textInput])

    return { searchValue };
}

export default useGetRepos;
