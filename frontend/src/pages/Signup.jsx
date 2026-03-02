import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/signup', formData);
            if (response.status === 201) {
                toast.success('Account created successfully!');
                navigate('/signin');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-panel">
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join KodFliex and unlock premium features</p>

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
                    <Mail className="input-icon" size={20} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="glass-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="input-group">
                    <Phone className="input-icon" size={20} />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="glass-input"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
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
                        autoComplete="new-password"
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

                <div className="input-group">
                    <Lock className="input-icon" size={20} />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="glass-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <button type="submit" className="glass-button" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <div className="link-text">
                Already have an account? <Link to="/signin">Sign in</Link>
            </div>
        </div>
    );
}
