import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {message} from 'antd'

const Header = () => {
    const [loginuser, setloginuser] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            setloginuser(user)
        }
    },[])
    const handlelogout=()=>{
        localStorage.removeItem('user');
        message.success("logOut successfully")
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className=" container-fluid">
                    
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to='/'>Finance Tracker</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                
                                <p className="nav-link active" aria-current="page" to='/user'>
                                {loginuser && loginuser.name}
                                </p>
                            </li>
                            <li className="nav-item ">                               
                            <button className="btn btn-primary"
                            onClick={handlelogout}
                             >
                                Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header