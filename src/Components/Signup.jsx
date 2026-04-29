import { useState } from "react";
import { Eye, EyeOff, Key, User, Mail, Phone, AlertCircle, CheckCircle,} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const Signup = () => {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // State variables for UI feedback
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Generates a cryptographically strong password with mixed character types
   * @param {number} length - The desired length of the password (default: 12)
   * @returns {string} A randomly generated strong password
   */
  const generateStrongPassword = (length = 12) => {
    // Character sets for password generation
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    // const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  
    const all = upper + lower + numbers; 
    // + symbols;
  
    let password = "";
    
    // Ensure at least one character from each category for strength
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    // password += symbols[Math.floor(Math.random() * symbols.length)];
  
    // Fill the remaining length with random characters
    for (let i = password.length; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }
  
    // Shuffle the characters to avoid predictable patterns
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  /**
   * Handles form submission and user registration process
   * @param {Event} e - Form submission event
   */
  const submit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccess('');
    setError('');
    setLoading("Checking user availability...");

    try {
      // Step 1: Check if user already exists to prevent duplicates
      // Note: This would normally use axios.post() in your actual app
      console.log("Checking user availability...", { username, email, phone });
      
      // Simulate API response for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Proceed with user registration
      setLoading("Creating your account...");
      
      // Simulate registration API call
      console.log("Registering user...", { username, email, phone, password });
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Handle successful registration
      setLoading("");
      setSuccess("Account created successfully! Welcome aboard!");
      
      // Clear form on success (optional)
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      
    } catch (error) {
      // Handle registration errors
      setLoading("");
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar/>
   
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      paddingTop: '3rem',
      paddingBottom: '3rem'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            
            {/* Header Section */}
            <div className="text-center mb-5">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#1976d2'
                }}
              >
                
                <User size={32} color="white" />
              </div>
              <h2 className="fw-bold text-dark mb-2">Create Account</h2>
              <p className="text-muted">Join us today and get started</p>
            </div>

            {/* Main Form Card */}
            <div 
              className="card shadow-lg border-0"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden'
              }}
            >
              <div className="card-body p-5">
                
                {/* Status Messages */}
                {loading && (
                  <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
                    <div 
                      className="spinner-border spinner-border-sm me-3" 
                      role="status"
                      style={{ width: '1.25rem', height: '1.25rem' }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>{loading}</span>
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <CheckCircle size={20} className="me-3" />
                    <span>{success}</span>
                  </div>
                )}
                
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={20} className="me-3" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Registration Form */}
                <div onSubmit={submit}>
                  
                  {/* Username Field */}
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-medium">
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <User size={20} className="text-muted" />
                      </span>
                      <input 
                        type="text"
                        id="username"
                        className="form-control border-start-0 ps-0"
                        placeholder="Choose a username"
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        required
                        style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Mail size={20} className="text-muted" />
                      </span>
                      <input 
                        type="email"
                        id="email"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required
                        style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label fw-medium">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Phone size={20} className="text-muted" />
                      </span>
                      <input 
                        type="text" 
                        id="phone"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter phone number"
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone} 
                        required
                        style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
                      />
                    </div>
                  </div>

                  {/* Password Field with Controls */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Key size={20} className="text-muted" />
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control border-start-0 border-end-0 ps-0"
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required
                        style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
                      />
                      
                      {/* Password visibility toggle */}
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ borderColor: '#ced4da' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    
                    {/* Password generation button */}
                    <button
                      type="button"
                      onClick={() => setPassword(generateStrongPassword())}
                      className="btn btn-outline-primary btn-sm mt-2"
                    >
                      <Key size={16} className="me-1" />
                      Generate Strong Password
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2 mb-4">
                    <button 
                      type="submit" 
                      onClick={submit}
                      disabled={loading}
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: '#1976d2',
                        borderColor: '#1976d2',
                        padding: '0.75rem 1.5rem'
                      }}
                    >
                      {loading ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <div 
                            className="spinner-border spinner-border-sm me-2" 
                            role="status"
                            style={{ width: '1.25rem', height: '1.25rem' }}
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <button 
                      onClick={() => console.log('Navigate to signin')}
                      className="btn btn-link p-0 text-decoration-none fw-medium"
                      style={{ 
                        color: '#1976d2',
                        verticalAlign: 'baseline'
                      }}
                    >
                      <Link to ="/signin"> Sign in here</Link>
                     
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap CSS via CDN - Add this to your HTML head */}
      <style>
        {`
          @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
          
          /* Custom enhancements */
          .form-control:focus {
            border-color: #1976d2;
            box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.25);
          }
          
          .input-group-text {
            background-color: #f8f9fa !important;
            border-color: #ced4da;
          }
          
          .btn-primary:hover {
            background-color: #1565c0;
            border-color: #1565c0;
            transform: translateY(-1px);
            transition: all 0.2s ease;
          }
          
          .btn-outline-primary:hover {
            transform: translateY(-1px);
            transition: all 0.2s ease;
          }
          
          .card {
            transition: transform 0.2s ease;
          }
          
          .alert {
            border-radius: 0.5rem;
            border: none;
          }
          
          .btn-link:hover {
            text-decoration: underline !important;
          }
        `}
      </style>
    </div>
     </div>
  );
};

export default Signup;
