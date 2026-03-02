import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/signin', formData, {
                withCredentials: true // Important for receiving the cookie
            });

            if (response.status === 200) {
                toast.success('Signed in successfully!');
                // Redirect upon successful login using window.location.href
                window.location.href = 'https://kod-fliex.vercel.app/';
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Invalid credentials or server error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-panel">
            <h2 className="title">Welcome Back</h2>
            <p className="subtitle">Sign in to your KodFliex account</p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <User className="input-icon" size={20} />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="glass-input"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="input-group">
                    <Lock className="input-icon" size={20} />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="glass-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="input-icon"
                        style={{ left: 'auto', right: '0.875rem', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button type="submit" className="glass-button" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="link-text">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}
