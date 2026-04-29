import { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import { Link } from "react-router-dom";
// import Carousel from "./Carousel";
import Footer from "./Footer";
// import { hover } from "@testing-library/user-event/dist/hover";

const GetProducts = () => {
    // ================= STATE MANAGEMENT =================
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState("");
    const navigate = useNavigate();

    const IMG_BASE_URL = "https://joemwangi.pythonanywhere.com/static/images/";

    // ================= API FUNCTIONS =================
    const fetchProducts = async () => {
        setLoading("Please wait, we are retrieving the products...");
        setError('');

        try {
            const response = await axios.get("https://joemwangi.pythonanywhere.com/api/get_product_details");
            setProducts(response.data);
            setLoading("");
        } catch (error) {
            setError(`Failed to load products: ${error.message}`);
            console.error("API Error:", error);
            setLoading("");
        }
    };

    useEffect(() => {
        fetchProducts();
        console.log("Component mounted - AOS would be initialized here");
        
        // Add CSS for hover effects
        const style = document.createElement('style');
        style.textContent = `
            .product-card-hover {
                transition: all 0.3s ease !important;
                cursor: pointer;
            }
            
            .product-card-hover:hover {
                transform: translateY(-10px) !important;
                box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
                border: 1px solid rgba(0, 123, 255, 0.3) !important;
            }
            
            .product-image-hover {
                transition: transform 0.3s ease !important;
            }
            
            .product-card-hover:hover .product-image-hover {
                transform: scale(1.05) !important;
            }
            
            .purchase-button-hover {
                transition: all 0.3s ease !important;
            }
            
            .product-card-hover:hover .purchase-button-hover {
                background: linear-gradient(45deg, #0056b3, #007bff) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4) !important;
            }
            
            .card-title-hover {
                transition: color 0.3s ease !important;
            }
            
            .product-card-hover:hover .card-title-hover {
                color: #0056b3 !important;
            }
            
            .price-hover {
                transition: all 0.3s ease !important;
            }
            
            .product-card-hover:hover .price-hover {
                color: #ffc107 !important;
                text-shadow: 0 2px 4px rgba(255, 193, 7, 0.3) !important;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    
    const getFilteredProducts = () => {
        return products.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    /**
     * Handles sorting products by price
     * @param {string} value - Sort order ('low', 'high', or '')
     */
    const handleSortChange = (value) => {
        setSortOrder(value);
        
        if (!value) {
            // Reset to original order by re-fetching
            fetchProducts();
            return;
        }

        const sortedProducts = [...products].sort((a, b) => {
            if (value === "low") return a.product_cost - b.product_cost;
            if (value === "high") return b.product_cost - a.product_cost;
            return 0;
        });
        
        setProducts(sortedProducts);
    };

    /**
     * Handles purchase button click
     * In actual implementation, this would navigate to payment page
     */
    // const handlePurchase = (product) => {
    //     console.log("Purchase clicked for:", product.product_name);
    //     alert(`Redirecting to payment for ${product.product_name}`);
    //     // Original: navigate('/makepayment', { state: { product } });
    // };

    /**
     * Loads more products by increasing visible count
     */
    const loadMoreProducts = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    /**
     * Resets search and shows all products
     */
    const clearSearch = () => {
        setSearchTerm("");
        setVisibleCount(6);
    };

    // ================= COMPUTED VALUES =================
    const filteredProducts = getFilteredProducts();
    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMoreProducts = visibleCount < filteredProducts.length;
    const showNoResults = products.length > 0 && filteredProducts.length === 0;

    // ================= COMPONENT STYLES =================
    const styles = {
        heroHeader: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem 0',
            marginBottom: '2rem'
        },
        productCard: {
            transition: 'all 0.3s ease',
            borderRadius: '15px',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            height: '100%'
        },
        productImage: {
            height: '250px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            width: '100%'
        },
        purchaseButton: {
            background: 'linear-gradient(45deg, #007bff, #0056b3)',
            border: 'none',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            padding: '0.5rem'
        },
        loadingSpinner: {
            width: '3rem',
            height: '3rem',
            borderWidth: '0.3em'
        }
    };

    // ================= RENDER COMPONENT =================
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Mock Navbar */}
            <Navbar/> 
            
            {/* Hero Header Section */}
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

            {/* Mock Carousel */}
            {/* <div>
            <Carousel/>
            </div>  */}
            
            {/* Main Content Container */}
            <div className="container" style={{ flexGrow: 1 }}>
                {/* Products Section Header */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 className="text-center text-primary mb-4">
                            <i className="fas fa-laptop me-2"></i>
                            Premium Laptops Collection
                        </h2>
                        
                        {/* Search and Filter Controls */}
                        <div className="row g-3 align-items-center justify-content-between mb-4">
                            {/* Search Input */}
                            <div className="col-md-6 col-lg-5">
                                <div className="input-group">
                                    <span className="input-group-text bg-primary text-white border-primary">
                                        🔍
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        placeholder="Search for laptops..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button 
                                            className="btn btn-outline-secondary"
                                            onClick={clearSearch}
                                            title="Clear search"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="col-md-4 col-lg-3">
                                <select
                                    className="form-select border-primary"
                                    value={sortOrder}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    <option value="">Sort by Price</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                </select>
                            </div>

                            {/* Results Counter */}
                            <div className="col-12 col-md-2">
                                <small className="text-muted">
                                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary mb-3" role="status" style={styles.loadingSpinner}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted fs-5">{loading}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="alert alert-danger text-center my-4" role="alert">
                        <span className="me-2">⚠️</span>
                        {error}
                        <button 
                            className="btn btn-outline-danger btn-sm ms-3"
                            onClick={fetchProducts}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* No Results State */}
                {showNoResults && (
                    <div className="text-center my-5">
                        <div className="text-muted mb-3">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h4>No products found</h4>
                            <p>No laptops match your search for "{searchTerm}"</p>
                            <button className="btn btn-primary" onClick={clearSearch}>
                                <span className="me-2">↺</span>
                                Show All Products
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {visibleProducts.length > 0 && (
                    <div className="row g-4 mb-5">
                        {visibleProducts.map((product, index) => (
                            <div 
                                key={product.id || index} 
                                className="col-lg-4 col-md-6 col-sm-12"
                            >
                                {/* Product Card with Hover Effects */}
                                <div className="card product-card-hover" style={styles.productCard}>
                                    {/* Product Image */}
                                    <div className="position-relative overflow-hidden">
                                        <img
                                           src={`${IMG_BASE_URL}${product.product_photo}`}
                                            className="card-img-top product-image-hover"
                                            alt={product.product_name}
                                            style={styles.productImage}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                                            }}
                                        />
                                        {/* Stock Badge */}
                                        <div className="position-absolute top-0 end-0 m-2">
                                            <span className="badge bg-success">In Stock</span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="card-body d-flex flex-column">
                                        {/* Product Name */}
                                        <h5 className="card-title card-title-hover text-primary fw-bold mb-2">
                                            {product.product_name}
                                        </h5>

                                        {/* Product Description */}
                                        <p className="card-text text-muted mb-3 flex-grow-1">
                                            {product.product_description?.length > 80 
                                                ? `${product.product_description.slice(0, 80)}...` 
                                                : product.product_description
                                            }
                                        </p>

                                        {/* Price and Action */}
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="h4 price-hover text-warning fw-bold mb-0">
                                                    KES {product.product_cost?.toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Purchase Button */}
                                            <button
                                                className="btn btn-primary purchase-button-hover w-100 fw-bold py-2"
                                                onClick={()=> navigate('/makepayment',{state:{product}})}
                                            >
                                                <span className="me-2">🛒</span>
                                                Purchase Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {hasMoreProducts && (
                    <div className="text-center mb-5">
                        <button 
                            className="btn btn-outline-primary btn-lg px-4 py-2"
                            onClick={loadMoreProducts}
                        >
                            <span className="me-2">➕</span>
                            Load More Products
                            <span className="badge bg-primary ms-2">
                                {filteredProducts.length - visibleCount} remaining
                            </span>
                        </button>
                    </div>
                )}
            </div>

{/* footer */}
                <Footer/>
        </div>
    );
};

export default GetProducts;
