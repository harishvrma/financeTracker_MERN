import React, { useState,useEffect } from 'react'
import{Form,Input, message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Login = () => {   
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const submithandle = async (values)=>{
        try {
            setloading(true)
            const {data} = await axios.post('/api/v1/users/login',values)
            setloading(false)
            message.success("login success!");
            localStorage.setItem('user', JSON.stringify({...data.user,password:''}))
        
            navigate('/')

        } catch (error) {
            setloading(false)
            message.error('something went wrong')
            
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate])
  return (
    <>
    <div className="register-page">
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submithandle}>
        <h1>Login</h1>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary'> Login</button>
            </div>
            <Link to='/register'>New User? Click Here to Register</Link>
        </Form>
    </div>
    </>
  )
}

export default Login