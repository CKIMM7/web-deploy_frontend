import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/store';

export default function Deployments() {
  const user = useSelector(state => state.user.user);
  
  const ec2launchHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/create`, {
      name: user.name,
      guid: user.guid
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
  }

  const ec2StopHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/stop`, {
      name: user.name,
      guid: user.guid
    })
  }

  const ec2StartHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/start`, {
      name: user.name,
      guid: user.guid
    })
  }

  const ec2TerminateHandler = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/terminate`, {
      name: user.name,
      guid: user.guid
    })
  }

  const viewYourServers = () => {
    axios.post(`${process.env.REACT_APP_URL}/ec2/instances`, {
      name: user.name,
      guid: user.guid
    }).then((s) => {
      console.log(s)

    }).catch((e) => {
      console.log(e)
    })
  }

  return <div>
    <p>Deployments page main</p>
    <div className='ec2-container'>
        {user.id && <button onClick={ec2launchHandler} className='ec2'>Launch EC2 instance</button>}
        {user.id && <button onClick={ec2StopHandler} className='ec2'>Stop EC2 instance</button>}
        {user.id && <button onClick={ec2StartHandler} className='ec2'>Start EC2 instance</button>}
        {user.id && <button onClick={ec2TerminateHandler} className='ec2'>Terminate EC2 instance</button>}
        {user.id && <button onClick={viewYourServers} className='ec2'>View your servers</button>}
      </div>

  </div>
}
