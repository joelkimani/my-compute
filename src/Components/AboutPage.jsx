import React from "react";
import Footer from "./Footer";

const AboutUs = () => {
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
      
      {/* Page Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">About ComputeHub</h2>
        <p className="text-muted">
          Smart Deals. Smarter Tech — your trusted tech partner since 2015.
        </p>
      </div>

      {/* Intro Section */}
      <div className="row align-items-center mb-5">
        {/* Left: Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/computehublogo.png"
            alt="About ComputeHub"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Right: Text */}
        <div className="col-md-6">
          <h4 className="fw-bold mb-3">Who We Are</h4>
          <p className="text-muted">
            At ComputeHub, we specialize in delivering the latest technology at unbeatable prices. 
            Our mission is to make high-quality tech accessible to everyone, whether you're 
            a student, professional, or tech enthusiast.
          </p>
          <p className="text-muted">
            Since our founding, we’ve served thousands of happy customers with laptops, desktops, 
            accessories, and repair services. We believe in quality, trust, and building 
            long-term relationships with our clients.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row text-center mb-5">
        <div className="col-md-6 mb-4">
          <div className="p-4 border rounded h-100 shadow-sm">
            <h5 className="fw-bold text-primary mb-3">Our Mission</h5>
            <p className="text-muted">
              To provide cutting-edge technology and exceptional service that empowers 
              individuals and businesses to achieve more.
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-4 border rounded h-100 shadow-sm">
            <h5 className="fw-bold text-primary mb-3">Our Vision</h5>
            <p className="text-muted">
              To be the most trusted and innovative tech retailer in the region, 
              known for quality, affordability, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <h3 className="fw-bold text-primary">10+</h3>
          <p className="text-muted">Years in Business</p>
        </div>
        <div className="col-md-4 mb-4">
          <h3 className="fw-bold text-primary">5,000+</h3>
          <p className="text-muted">Happy Customers</p>
        </div>
        <div className="col-md-4 mb-4">
          <h3 className="fw-bold text-primary">12,000+</h3>
          <p className="text-muted">Products Sold</p>
        </div>
      </div>     
    </div>
    <Footer/>
    </div>
  );
};

export default AboutUs;
