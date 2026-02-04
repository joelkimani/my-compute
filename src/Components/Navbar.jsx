import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Logo from "./computehub-logo.png"; // Import the image

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top px-3">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand me-4">
          <img
            src="/computehublogo.png"
            alt="ComputeHub Logo"
            style={{ height: "75px", width: "auto" }}
          />
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary fw-semibold">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                <button className="btn btn-success btn-sm">Add Product</button>
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">
            {user ? (
              <>
                <span className="fw-bold text-primary">Welcome, {user.username}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline-primary btn-sm">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline-warning btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
