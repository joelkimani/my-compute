import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request submitted:", formData);
    setSubmitted(true);

    // Clear form
    setFormData({ name: "", email: "", message: "" });

    // In production: send to backend API
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
    <div>
      <Navbar/>
    <div className="container py-5">
        {/* Header */}
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
      <div className="row justify-content-center">
        
        {/* Left side: Contact Info */}
        <div className="col-lg-5 mb-4">
          <h2 className="fw-bold text-primary mb-3">Need Help?</h2>
          <p className="text-muted">
            Our support team is here to assist you with any questions or issues.
          </p>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="fas fa-envelope text-primary me-2"></i>
              support@computehub.com
            </li>
            <li className="mb-3">
              <i className="fas fa-phone-alt text-primary me-2"></i>
              +254 712 345 678
            </li>
            <li className="mb-3">
              <i className="fas fa-comments text-primary me-2"></i>
              Live Chat: Available 9am–6pm
            </li>
          </ul>
        </div>

        {/* Right side: Support Form */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4">
              <h5 className="fw-bold text-secondary mb-3">Contact Support</h5>
              
              {submitted && (
                <div className="alert alert-success py-2">
                  ✅ Your message has been sent! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Describe your issue or question"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Support;
