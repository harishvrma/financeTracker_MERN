import React, { useEffect, useState } from 'react'
import{Form,Input, message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const submithandle = async (values) => {
        try {
            console.log('Form Values:', values);  // Log form values
            setloading(true);
            await axios.post('/api/v1/users/register', values);  // Correct URL
            message.success('Registration Successful!');
            setloading(false);
            navigate('/login');
        } catch (error) {
            setloading(false);
            console.error('Error posting form:', error.response ? error.response.data : error.message);
            message.error('Failed to register. Please try again.');
        }
    };
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
        <h1>Register</h1>
            <Form.Item label="Name" name="name">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary'> Register</button>
            </div>
            <Link to='/login'>Already Registered ? Click Here to Login</Link>
        </Form>
    </div>
    </>
  )
}

export default Register