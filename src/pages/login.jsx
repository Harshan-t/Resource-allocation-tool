import '../styles/login.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.jsx';

import mylogo from '../assets/logo.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const { setUserData } = useContext(UserContext);

    const hardcodedUsers = [
        {
            username: 'admin',
            password: 'admin123',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'Admin',
        },
        {
            username: 'user',
            password: 'user123',
            name: 'Regular User',
            email: 'user@example.com',
            role: 'user',
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const matchedUser = hardcodedUsers.find(
            (user) => user.username === username.trim() && user.password === password
        );

        if (!matchedUser) {
            setLoginError('Invalid username or password.');
            return;
        }

        setLoginError('');
        setUserData({
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
            picture: '',
        });

        if (matchedUser.role === 'Admin') {
            navigate('/dashboardhome');
            return;
        }

        navigate('/home');
    };

    return (
        <div>
            <img src={mylogo} alt="App Logo" className='m-5' />
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Sign in</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="input-field"
                                required
                                aria-label="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="input-field"
                                required
                                aria-label="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}

                        <button type="submit" className="sign-in-btn">
                            Sign in
                        </button>
                    </form>

                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <p className="legal">
                        This site is protected by reCAPTCHA.{' '}
                        <a href="#">Privacy Policy</a> and{' '}
                        <a href="#">Terms of Service</a> apply.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;