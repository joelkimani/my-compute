
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signin = () => {
    // State variables for form inputs and UI feedback
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    // Hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Handles form submission for user signin
     * @param {Event} e - Form submission event
     */
    const submit = async (e) => {
        e.preventDefault();
        
        // Clear any previous errors and show loading state
        setError('');
        setLoading("Please wait as we log you in...");
        
        try {
            // Prepare form data for API request
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);

            // Make API request to signin endpoint
            const response = await axios.post(
                "https://joemwangi.pythonanywhere.com/api/signin", 
                data
            );
            
            // Clear loading state
            setLoading("");
            
            // Handle successful signin
            if (response.data.user) {
                // Store user data in localStorage for persistence
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // Navigate to home page
                navigate("/");
            } else {
                // Display error message from server
                setError(response.data.Message || "Login failed. Please try again.");
            }
        } catch (error) {
            // Handle network or other errors
            setLoading("");
            setError(error.response?.data?.Message || error.message || "An error occurred. Please try again.");
        }
    };
    const styles = {
        heroHeader: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem 0',
            marginBottom: '2rem'
        }
    }

    return (
        <div className="min-vh-100 bg-light">
            {/* <Navbar /> */}
            <Navbar/>
            <header style={styles.heroHeader}>
                <div className="container">
                    <h1 className="display-4 fw-bold mb-2">
                        ComputeHub
                    </h1>
                    <p className="lead mb-0">
                        Smart Deals. Smarter Tech
                    </p>
                </div>
            </header>
            {/* <div>
                <Navbar/> 
            </div> */}
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center min-vh-100 py-5">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        {/* Main signin card */}
                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-4 p-md-5 ">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                                    <p className="text-muted">Sign in to your account</p>
                                </div>

                                {/* Loading indicator */}
                                {loading && (
                                    <div className="alert alert-info d-flex align-items-center mb-3" role="alert">
                                        <div className="spinner-border spinner-border-sm me-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        {loading}
                                    </div>
                                )}

                                {/* Error message */}
                                {error && (
                                    <div className="alert alert-danger mb-3" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}

                                {/* Signin form */}
                                <form onSubmit={submit}>
                                    {/* Email input */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-medium">
                                            Email Address
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-envelope text-muted"></i>
                                            </span>
                                            <input 
                                                type="email" 
                                                id="email"
                                                className="form-control border-start-0 ps-0" 
                                                placeholder="Enter your email address" 
                                                onChange={(e) => setEmail(e.target.value)} 
                                                value={email} 
                                                required 
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password input */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label fw-medium">
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-lock text-muted"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                id="password"
                                                className="form-control border-start-0 ps-0" 
                                                placeholder="Enter your password" 
                                                onChange={(e) => setPassword(e.target.value)} 
                                                value={password} 
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 py-2 fw-medium"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </span>
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="text-center my-4">
                                    <hr className="my-3" />
                                    <small className="text-muted bg-light px-3">Don't have an account?</small>
                                </div>

                                {/* Signup link */}
                                <div className="text-center">
                                    <Link 
                                        to="/signup" 
                                        className="btn btn-outline-primary w-100 py-2 fw-medium"
                                    >
                                        <i className="bi bi-person-plus me-2"></i>
                                        Create New Account
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-4">
                            <small className="text-muted">
                                By signing in, you agree to our Terms of Service and Privacy Policy
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;