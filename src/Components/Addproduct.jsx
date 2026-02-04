import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  // State for form data
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  
  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // State for form validation
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  // Check if user is authenticated on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const proceed = window.confirm("You must sign in to add products. Do you want to sign in now?");
      if (proceed) {
        navigate("/signin");
      } else {
        navigate("/"); // or stay on page / redirect elsewhere
      }
    }
  }, [navigate]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Validate form fields
  const validateForm = () => {
    if (!product_name.trim()) return "Product name is required";
    if (!product_description.trim()) return "Product description is required";
    if (!product_cost || parseFloat(product_cost) <= 0) return "Valid product cost is required";
    if (!product_photo) return "Product photo is required";
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setMessage("");
    setError("");
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setValidated(true);
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("product_name", product_name.trim());
      formData.append("product_description", product_description.trim());
      formData.append("product_cost", parseFloat(product_cost));
      formData.append("product_photo", product_photo);

      // Get authentication token
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      // Make API request
      const response = await axios.post(
        "https://joemwangi.pythonanywhere.com/api/add_product",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success - clear form and show success message
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setValidated(false);
      setMessage("Product added successfully!");

      // Optional: Navigate to products list after success
      // setTimeout(() => navigate("/products"), 2000);

    } catch (error) {
      // Handle different types of errors
      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/signin"), 2000);
      } else if (error.response?.status === 413) {
        setError("File too large. Please select a smaller image.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add product. Please try again.");
      }
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      setProductPhoto(file);
      setError(""); // Clear any previous file errors
    }
  };

  return (
    <div>
      <Navbar />
    <div className="min-vh-100 bg-light">
      
      {/* Main container with proper spacing and centering */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            
            {/* Card container with shadow and rounded corners */}
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-header bg-primary text-white text-center py-4">
                <h2 className="mb-0 fw-bold">
                  <i className="fas fa-plus-circle me-2"></i>
                  Upload New Product
                </h2>
              </div>
              
              <div className="card-body p-4">
                
                {/* Loading indicator */}
                {loading && (
                  <div className="alert alert-info d-flex align-items-center" role="alert">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Please wait while we upload your product...</div>
                  </div>
                )}

                {/* Success message */}
                {message && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {message}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setMessage("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {/* Product upload form */}
                <form 
                  onSubmit={handleSubmit} 
                  className={`needs-validation ${validated ? 'was-validated' : ''}`}
                  noValidate
                >
                  
                  {/* Product Name Input */}
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label fw-semibold">
                      <i className="fas fa-tag me-1"></i>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="form-control form-control-lg"
                      placeholder="Enter product name"
                      value={product_name}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      maxLength="100"
                    />
                    <div className="invalid-feedback">
                      Please provide a valid product name.
                    </div>
                  </div>

                  {/* Product Description Textarea */}
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label fw-semibold">
                      <i className="fas fa-align-left me-1"></i>
                      Product Description *
                    </label>
                    <textarea
                      id="productDescription"
                      className="form-control"
                      rows="4"
                      placeholder="Describe your product in detail..."
                      value={product_description}
                      onChange={(e) => setProductDescription(e.target.value)}
                      required
                      maxLength="1000"
                    ></textarea>
                    <div className="form-text">
                      {product_description.length}/1000 characters
                    </div>
                    <div className="invalid-feedback">
                      Please provide a product description.
                    </div>
                  </div>

                  {/* Product Cost Input */}
                  <div className="mb-3">
                    <label htmlFor="productCost" className="form-label fw-semibold">
                      <i className="fas fa-dollar-sign me-1"></i>
                      Product Cost (KES) *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">KES</span>
                      <input
                        type="number"
                        id="productCost"
                        className="form-control form-control-lg"
                        placeholder="0.00"
                        value={product_cost}
                        onChange={(e) => setProductCost(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="invalid-feedback">
                      Please provide a valid product cost.
                    </div>
                  </div>

                  {/* Product Photo Input */}
                  <div className="mb-4">
                    <label htmlFor="productPhoto" className="form-label fw-semibold">
                      <i className="fas fa-image me-1"></i>
                      Product Photo *
                    </label>
                    <input
                      type="file"
                      id="productPhoto"
                      className="form-control form-control-lg"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="form-text">
                      Accepted formats: JPG, PNG, GIF. Maximum size: 5MB
                    </div>
                    <div className="invalid-feedback">
                      Please select a product image.
                    </div>
                    
                    {/* Image preview */}
                    {product_photo && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(product_photo)}
                          alt="Product preview"
                          className="img-thumbnail"
                          style={{ maxHeight: '150px', maxWidth: '150px' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-cloud-upload-alt me-2"></i>
                          Upload Product
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Additional help text */}
                <div className="mt-4 text-center">
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    All fields marked with * are required
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddProducts;