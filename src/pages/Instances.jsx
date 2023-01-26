import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/store';
import useGetRepos from "../API/useGetRepos";

export default function Instances() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const instance = useSelector(state => state.user.instanceState);

    const getEc2InstanceState = () => {
        axios.post(`${process.env.REACT_APP_URL}/ec2/state`, {
          name: user.name,
          guid: user.guid
        }).then((s) => {
          console.log(s)
          dispatch(userActions.setInstanceState(s.data.message.Reservations[0].Instances[0]))
          
        }).catch((e) => {
          console.log(e)
        })
      }
  

  return (

    <div className='instances-container'>
        <div className='instance'>
          <p onClick={() => { getEc2InstanceState() }}>Instance ID: {user.instance_id}</p>
          <p>OS Type: {instance.PlatformDetails}</p>
          <p>Architecture: {instance.Architecture}</p>
          <a href={`http://${instance.PublicIpAddress}`} target="_blank" rel="noopener noreferrer">public IP: {instance.PublicIpAddress}</a>
          <p> {instance.PrivateIpAddress}</p>
        </div> 
      </div>
  )
}
