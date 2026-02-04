import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Services = () => {
  const servicesList = [
    {
      icon: "fas fa-laptop",
      title: "Laptop Sales",
      description:
        "We offer a wide range of laptops from top brands at competitive prices."
    },
    {
      icon: "fas fa-tools",
      title: "Repair & Maintenance",
      description:
        "Professional repair services for laptops, desktops, and other tech devices."
    },
    {
      icon: "fas fa-shipping-fast",
      title: "Fast Delivery",
      description:
        "Get your products delivered quickly and securely to your doorstep."
    },
    {
      icon: "fas fa-headset",
      title: "24/7 Support",
      description:
        "Our friendly support team is here to assist you anytime, day or night."
    }
  ];
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
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">Our Services</h2>
        <p className="text-muted">
          At ComputeHub, we provide top-notch solutions for all your tech needs.
        </p>
      </div>

      {/* Service Cards */}
      <div className="row g-4">
        {servicesList.map((service, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="card shadow-sm border-0 h-100 text-center p-3">
              <div className="mb-3">
                <i className={`${service.icon} fa-3x text-primary`}></i>
              </div>
              <h5 className="fw-bold">{service.title}</h5>
              <p className="text-muted">{service.description}</p>
              <button className="btn btn-outline-primary btn-sm mt-auto">
                <Link to="/support">
                Learn More
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Services;
