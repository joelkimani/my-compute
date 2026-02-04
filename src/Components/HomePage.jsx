import React from "react";
import Footer from "./Footer";
// import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="bg-light py-5">
      {/* Container to center and add spacing */}
      <div className="container text-center">
        
        {/* Logo & Tagline */}
        <div className="mb-4">
          {/* Logo icon */}
          <img
            src="/computehublogo.png" // Replace with your logo path
            alt="ComputeHub Logo"
            // width="150"
            // height=""
            className="mb-2 logo"
          />
          <h4 className="fw-bold text-primary">ComputeHub</h4>
          <p className="text-muted">Smart Deals. Smarter Tech</p>
        </div>

        {/* Main Heading */}
        <h2 className="fw-bold">
          Your Technology Hub for{" "}
          <span className="text-primary">Smart Deals</span>
        </h2>

        {/* Description */}
        <p className="text-muted mb-4">
          Discover cutting-edge technology at unbeatable prices. Connect with
          the latest hardware, software, and digital solutions through our
          intelligent marketplace.
        </p>

        {/* Buttons */}
        <div className="mb-5">
          <a href="#deals" className="btn btn-primary me-3">
            Explore Deals
          </a>
          <a href="#learn" className="btn btn-outline-secondary">
            Learn More
          </a>
        </div>

        {/* Feature Cards */}
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <span className="fs-1 text-primary">⚡</span>
                </div>
                <h5 className="card-title fw-bold">Lightning Fast</h5>
                <p className="text-muted">
                  Get instant access to the latest tech deals and updates.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <span className="fs-1 text-primary">🛡</span>
                </div>
                <h5 className="card-title fw-bold">Trusted & Secure</h5>
                <p className="text-muted">
                  All products are verified and backed by our quality guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <span className="fs-1 text-primary">📈</span>
                </div>
                <h5 className="card-title fw-bold">Smart Savings</h5>
                <p className="text-muted">
                  AI-powered price tracking ensures you never miss a great deal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
