
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

const Makepayment = () => {
    // Extract product data from router state (passed from previous page)
    const { product } = useLocation().state || {};
    
    // State variables for payment method selection
    const [paymentMethod, setPaymentMethod] = useState("mpesa");
    
    // M-Pesa form states
    const [phone, setPhone] = useState("");
    
    // Card payment form states
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState("");
    
    // Common UI states
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    const navigate = useNavigate();

    /**
     * Validates and formats Kenyan phone numbers
     * Converts 07XXXXXXXX to 2547XXXXXXXX and 01XXXXXXXX to 2541XXXXXXXX
     * @param {string} phoneNumber - The phone number to validate and format
     * @returns {object} - Object containing isValid boolean and formatted phone number
     */
    const validateAndFormatPhone = (phoneNumber) => {
        let cleanedPhone = phoneNumber.trim();
        
        // Convert 07XXXXXXXXX to 2547XXXXXXX OR 01XXXXXXX to 2541XXXXXXXX
        if (/^0(7|1)\d{8}$/.test(cleanedPhone)) {
            cleanedPhone = '254' + cleanedPhone.substring(1);
        }

        // Validate that it now starts with 2547 or 2541 and has 12 digits
        const isValid = /^254(7|1)\d{8}$/.test(cleanedPhone);
        
        return {
            isValid,
            formattedPhone: cleanedPhone
        };
    };

    /**
     * Formats card number with spaces for better readability
     * @param {string} value - Raw card number input
     * @returns {string} - Formatted card number
     */
    const formatCardNumber = (value) => {
        // Remove all non-digits
        const cleanValue = value.replace(/\D/g, '');
        // Add spaces every 4 digits
        return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    /**
     * Formats expiry date as MM/YY
     * @param {string} value - Raw expiry date input
     * @returns {string} - Formatted expiry date
     */
    const formatExpiryDate = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length >= 2) {
            return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
        }
        return cleanValue;
    };

    /**
     * Validates card number using Luhn algorithm
     * @param {string} cardNumber - Card number to validate
     * @returns {boolean} - Whether card number is valid
     */
    const validateCardNumber = (cardNumber) => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        if (!/^\d{13,19}$/.test(cleanNumber)) return false;
        
        // Luhn algorithm
        let sum = 0;
        let isEven = false;
        
        for (let i = cleanNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanNumber[i]);
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            
            sum += digit;
            isEven = !isEven;
        }
        
        return sum % 10 === 0;
    };

    /**
     * Handles M-Pesa payment processing
     */
    const processMpesaPayment = async () => {
        // Validate and format phone number
        const { isValid, formattedPhone } = validateAndFormatPhone(phone);
        
        if (!isValid) {
            setMessage("Invalid phone number. Please use format 07XXXXXXXX or 2547XXXXXXXX");
            return false;
        }

        try {
            // Prepare form data for API request
            const data = new FormData();
            data.append("phone", formattedPhone);
            data.append("amount", product.product_cost);
            data.append("payment_method", "mpesa");

            // Make API request to M-Pesa payment endpoint
            const response = await axios.post(
                "https://joemwangi.pythonanywhere.com/api/mpesa_payment",
                data
            );
            
            setMessage(response.data.message);
            return true;
            
        } catch (error) {
            setMessage(
                error.response?.data?.message || 
                error.message || 
                "M-Pesa payment failed. Please try again."
            );
            return false;
        }
    };

    /**
     * Handles card payment processing
     */
    const processCardPayment = async () => {
        // Validate card details
        if (!validateCardNumber(cardNumber)) {
            setMessage("Invalid card number. Please check and try again.");
            return false;
        }

        const cleanCardNumber = cardNumber.replace(/\s/g, '');
        const [month, year] = expiryDate.split('/');
        
        if (!month || !year || month < 1 || month > 12) {
            setMessage("Invalid expiry date. Please use MM/YY format.");
            return false;
        }

        if (cvv.length < 3 || cvv.length > 4) {
            setMessage("Invalid CVV. Please enter 3 or 4 digits.");
            return false;
        }

        try {
            // Prepare form data for API request
            const data = new FormData();
            data.append("card_number", cleanCardNumber);
            data.append("expiry_month", month);
            data.append("expiry_year", `20${year}`);
            data.append("cvv", cvv);
            data.append("card_name", cardName);
            data.append("amount", product.product_cost);
            data.append("payment_method", "card");

            // Make API request to card payment endpoint
            const response = await axios.post(
                "https://joemwangi.pythonanywhere.com/api/card_payment",
                data
            );
            
            setMessage(response.data.message);
            return true;
            
        } catch (error) {
            setMessage(
                error.response?.data?.message || 
                error.message || 
                "Card payment failed. Please try again."
            );
            return false;
        }
    };

    /**
     * Handles form submission for payment processing
     * @param {Event} e - Form submission event
     */
    const submit = async (e) => {
        e.preventDefault();
        
        // Reset states
        setMessage("");
        setLoading(true);
        setPaymentSuccess(false);

        setMessage("Please wait as we process your payment...");

        let success = false;
        
        // Process payment based on selected method
        if (paymentMethod === "mpesa") {
            success = await processMpesaPayment();
        } else if (paymentMethod === "card") {
            success = await processCardPayment();
        }

        if (success) {
            setPaymentSuccess(true);
        }
        
        setLoading(false);
    };

    /**
     * Handles card number input formatting
     */
    const handleCardNumberChange = (e) => {
        const formattedNumber = formatCardNumber(e.target.value);
        if (formattedNumber.replace(/\s/g, '').length <= 19) {
            setCardNumber(formattedNumber);
        }
    };

    /**
     * Handles expiry date input formatting
     */
    const handleExpiryChange = (e) => {
        const formattedDate = formatExpiryDate(e.target.value);
        if (formattedDate.length <= 5) {
            setExpiryDate(formattedDate);
        }
    };

    /**
     * Handles CVV input validation
     */
    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setCvv(value);
        }
    };

    // Base URL for product images
    const img_url = "https://joemwangi.pythonanywhere.com/static/images/";

    // Redirect to home if no product data is available
    if (!product) {
        return (
            <div className="min-vh-100 bg-light">
                
                <div className="container mt-5">
                    <div className="alert alert-warning text-center">
                        <h4>No Product Selected</h4>
                        <p>Please select a product to make payment.</p>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => navigate('/')}
                        >
                            Go to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light">
            
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        {/* Payment Header */}
                        <div className="text-center mb-4">
                            <div className="d-inline-flex align-items-center bg-primary text-white px-4 py-2 rounded-pill mb-3">
                                <i className="bi bi-credit-card me-2"></i>
                                <h3 className="mb-0 fw-bold">SECURE PAYMENT</h3>
                            </div>
                            <p className="text-muted">Choose your preferred payment method</p>
                        </div>

                        {/* Product Details Card */}
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title text-primary mb-3">
                                    <i className="bi bi-bag me-2"></i>
                                    Order Summary
                                </h5>
                                
                                <div className="row align-items-center">
                                    {/* Product Image */}
                                    <div className="col-md-4 text-center mb-3 mb-md-0">
                                        <img
                                            src={img_url + product.product_photo}
                                            className="img-fluid rounded shadow-sm"
                                            alt={product.product_name}
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="col-md-8">
                                        <h6 className="fw-bold mb-2">{product.product_name}</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted">Amount:</span>
                                            <span className="h5 text-success fw-bold mb-0">
                                                KSh {parseInt(product.product_cost).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title text-primary mb-4">
                                    <i className="bi bi-wallet2 me-2"></i>
                                    Payment Method
                                </h5>
                                
                                <div className="row g-3">
                                    {/* M-Pesa Option */}
                                    <div className="col-md-6">
                                        <div 
                                            className={`card h-100 cursor-pointer border-2 ${paymentMethod === 'mpesa' ? 'border-success bg-light' : 'border-light'}`}
                                            onClick={() => setPaymentMethod('mpesa')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="card-body text-center p-3">
                                                <i className="bi bi-phone text-success display-6 mb-2"></i>
                                                <h6 className="fw-bold">M-Pesa</h6>
                                                <small className="text-muted">Pay with your mobile money</small>
                                                {paymentMethod === 'mpesa' && (
                                                    <i className="bi bi-check-circle-fill text-success mt-2 d-block"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card Option */}
                                    <div className="col-md-6">
                                        <div 
                                            className={`card h-100 cursor-pointer border-2 ${paymentMethod === 'card' ? 'border-primary bg-light' : 'border-light'}`}
                                            onClick={() => setPaymentMethod('card')}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="card-body text-center p-3">
                                                <i className="bi bi-credit-card text-primary display-6 mb-2"></i>
                                                <h6 className="fw-bold">Debit/Credit Card</h6>
                                                <small className="text-muted">Pay with Visa or Mastercard</small>
                                                {paymentMethod === 'card' && (
                                                    <i className="bi bi-check-circle-fill text-primary mt-2 d-block"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form Card */}
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h5 className="card-title text-primary mb-4">
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Payment Details
                                </h5>

                                {/* Status Messages */}
                                {message && (
                                    <div className={`alert ${paymentSuccess ? 'alert-success' : loading ? 'alert-info' : 'alert-danger'} d-flex align-items-center mb-4`}>
                                        {loading && (
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        )}
                                        {paymentSuccess && <i className="bi bi-check-circle-fill me-2"></i>}
                                        {!loading && !paymentSuccess && <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                                        <span>{message}</span>
                                    </div>
                                )}

                                {/* Payment Form */}
                                <form onSubmit={submit}>
                                    {/* M-Pesa Form */}
                                    {paymentMethod === 'mpesa' && (
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="phone" className="form-label fw-medium">
                                                    <i className="bi bi-telephone me-2"></i>
                                                    M-Pesa Phone Number
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-success text-white">
                                                        <i className="bi bi-phone"></i>
                                                    </span>
                                                    <input 
                                                        type="tel" 
                                                        id="phone"
                                                        placeholder="07XXXXXXXX or 2547XXXXXXXX" 
                                                        className="form-control" 
                                                        value={phone} 
                                                        onChange={(e) => setPhone(e.target.value)} 
                                                        required
                                                        disabled={loading}
                                                        pattern="^(07|01|2547|2541)\d{8}$"
                                                        title="Enter a valid Kenyan phone number"
                                                    />
                                                </div>
                                                <small className="form-text text-muted mt-1">
                                                    Enter your Safaricom number (07XXXXXXXX or 2547XXXXXXXX)
                                                </small>
                                            </div>

                                            {/* M-Pesa Instructions */}
                                            <div className="alert alert-light border-start border-4 border-success mb-4">
                                                <h6 className="fw-bold text-success mb-2">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    M-Pesa Payment Instructions
                                                </h6>
                                                <ol className="mb-0 small">
                                                    <li>Click "Make Payment" below</li>
                                                    <li>Check your phone for M-Pesa STK push notification</li>
                                                    <li>Enter your M-Pesa PIN to complete payment</li>
                                                    <li>You'll receive a confirmation SMS from M-Pesa</li>
                                                </ol>
                                            </div>
                                        </div>
                                    )}

                                    {/* Card Form */}
                                    {paymentMethod === 'card' && (
                                        <div>
                                            {/* Card Number */}
                                            <div className="mb-3">
                                                <label htmlFor="cardNumber" className="form-label fw-medium">
                                                    <i className="bi bi-credit-card me-2"></i>
                                                    Card Number
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-primary text-white">
                                                        <i className="bi bi-credit-card"></i>
                                                    </span>
                                                    <input 
                                                        type="text" 
                                                        id="cardNumber"
                                                        placeholder="1234 5678 9012 3456" 
                                                        className="form-control" 
                                                        value={cardNumber} 
                                                        onChange={handleCardNumberChange}
                                                        required
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            {/* Cardholder Name */}
                                            <div className="mb-3">
                                                <label htmlFor="cardName" className="form-label fw-medium">
                                                    <i className="bi bi-person me-2"></i>
                                                    Cardholder Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="cardName"
                                                    placeholder="John Doe" 
                                                    className="form-control" 
                                                    value={cardName} 
                                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>

                                            {/* Expiry and CVV */}
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="expiryDate" className="form-label fw-medium">
                                                        <i className="bi bi-calendar me-2"></i>
                                                        Expiry Date
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="expiryDate"
                                                        placeholder="MM/YY" 
                                                        className="form-control" 
                                                        value={expiryDate} 
                                                        onChange={handleExpiryChange}
                                                        required
                                                        disabled={loading}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="cvv" className="form-label fw-medium">
                                                        <i className="bi bi-shield-lock me-2"></i>
                                                        CVV
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="cvv"
                                                        placeholder="123" 
                                                        className="form-control" 
                                                        value={cvv} 
                                                        onChange={handleCvvChange}
                                                        required
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            {/* Card Instructions */}
                                            <div className="alert alert-light border-start border-4 border-primary mb-4">
                                                <h6 className="fw-bold text-primary mb-2">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    Card Payment Instructions
                                                </h6>
                                                <ul className="mb-0 small">
                                                    <li>We accept Visa and Mastercard</li>
                                                    <li>Your card will be charged immediately</li>
                                                    <li>You'll receive an email confirmation</li>
                                                    <li>All transactions are encrypted and secure</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button 
                                        className={`btn btn-lg w-100 py-3 fw-bold ${paymentMethod === 'mpesa' ? 'btn-success' : 'btn-primary'}`}
                                        type="submit"
                                        disabled={loading || (paymentMethod === 'mpesa' && !phone.trim()) || (paymentMethod === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv))}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status">
                                                    <span className="visually-hidden">Processing...</span>
                                                </span>
                                                Processing Payment...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`bi ${paymentMethod === 'mpesa' ? 'bi-phone' : 'bi-credit-card'} me-2`}></i>
                                                Pay KSh {parseInt(product.product_cost).toLocaleString()} 
                                                {paymentMethod === 'mpesa' ? ' via M-Pesa' : ' via Card'}
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Security Notice */}
                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        <i className="bi bi-shield-lock-fill me-1"></i>
                                        Your payment is secured with 256-bit SSL encryption
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment;
