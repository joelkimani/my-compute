import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  // ================= SLIDE DATA =================
  const slides = [
    {
      image: "/images1/advert1.webp",
      // title: "Latest Gaming Laptops",
      // subtitle: "Experience Ultimate Performance",
      // description: "Discover our collection of high-performance gaming laptops designed for professionals and enthusiasts.",
      // buttonText: "Shop Gaming",
      // buttonLink: "/products?category=gaming"
    },
    {
      image: "/images1/advert2.webp", 
      // title: "Business & Professional",
      // subtitle: "Power Your Productivity",
      // description: "Professional-grade laptops built for business users who demand reliability and performance.",
      // buttonText: "View Business",
      // buttonLink: "/products?category=business"
    },
    {
      image: "/images1/advert3.webp",
      // title: "Student Specials",
      // subtitle: "Affordable Excellence", 
      // description: "Budget-friendly laptops perfect for students without compromising on quality and features.",
      // buttonText: "Student Deals",
      // buttonLink: "/products?category=student"
    }
  ];

  // ================= STATE MANAGEMENT =================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // ================= AUTO-PLAY FUNCTIONALITY =================
  useEffect(() => {
    let interval = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Changed to 5 seconds for better UX
    }

    // Cleanup interval on component unmount or when auto-play stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [slides.length, isPlaying]);

  // ================= NAVIGATION HANDLERS =================
  /**
   * Navigate to the previous slide
   */
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  /**
   * Navigate to the next slide
   */
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Navigate to a specific slide by index
   * @param {number} index - The slide index to navigate to
   */
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  /**
   * Toggle auto-play functionality
   */
  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // ================= TOUCH/SWIPE HANDLERS =================
  /**
   * Handle touch start for mobile swipe functionality
   * @param {TouchEvent} e - Touch event
   */
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Handle touch move for mobile swipe functionality
   * @param {TouchEvent} e - Touch event
   */
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Handle touch end and determine swipe direction
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // ================= KEYBOARD NAVIGATION =================
  useEffect(() => {
    /**
     * Handle keyboard navigation (arrow keys and spacebar)
     * @param {KeyboardEvent} e - Keyboard event
     */
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          toggleAutoPlay();
          break;
        default:
          break;
      }
    };

    // Add event listener for keyboard navigation
    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup event listener
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // ================= COMPONENT STYLES =================
  const styles = {
    carouselContainer: {
      position: 'relative',
      height: '500px',
      overflow: 'hidden',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      margin: '2rem 0'
    },
    slideImage: {
     width: '100%',
      height: '500px',
      objectFit: 'cover'
    },   
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    indicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '0 4px'
    },
    playPauseButton: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 10
    }
  };

  // ================= RENDER COMPONENT =================
  return (
    <div className="container-fluid px-0">
      {/* Main Carousel Container */}
      <div 
        className="carousel-container"
        style={styles.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Image carousel"
      >
        {/* Current Slide Image */}
        <img
          src={slides[currentIndex].image}
          alt={`${slides[currentIndex].title} - Slide ${currentIndex + 1}`}
          style={styles.slideImage}
          className="carousel-image"
          onError={(e) => {
            // Fallback image if slide image fails to load
            e.target.src = 'https://via.placeholder.com/1200x500/667eea/ffffff?text=ComputeHub+Slide';
          }}
        />

        {/* Content Overlay */}
        <div style={styles.overlay} className="carousel-overlay">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                {/* Slide Content */}
                <div className="animate__animated animate__fadeInUp">
                  <h1 className="display-4 fw-bold mb-3">
                    {slides[currentIndex].title}
                  </h1>
                  <h2 className="h3 mb-4 text-warning">
                    {slides[currentIndex].subtitle}
                  </h2>
                  <p className="lead mb-4 fs-5">
                    {slides[currentIndex].description}
                  </p>
                  
                  {/* Call-to-Action Button */}
                  <a
                    href={slides[currentIndex].buttonLink}
                    className="btn btn-warning btn-lg px-4 py-2 fw-bold"
                    style={{
                      borderRadius: '25px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: '0 4px 15px rgba(255,193,7,0.4)'
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    {slides[currentIndex].buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {/* Previous Button */}
        <button
          className="carousel-nav-btn"
          style={{...styles.navButton, left: '20px'}}
          onClick={goToPrev}
          aria-label="Previous slide"
          title="Previous slide (←)"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Next Button */}
        <button
          className="carousel-nav-btn"
          style={{...styles.navButton, right: '20px'}}
          onClick={goToNext}
          aria-label="Next slide"
          title="Next slide (→)"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Play/Pause Button */}
        <button
          style={styles.playPauseButton}
          onClick={toggleAutoPlay}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>

        {/* Slide Indicators */}
        <div 
          className="d-flex justify-content-center align-items-center position-absolute bottom-0 start-50 translate-middle-x mb-4"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.indicator,
                backgroundColor: index === currentIndex ? '#ffc107' : 'rgba(255,255,255,0.5)',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                boxShadow: index === currentIndex ? '0 2px 10px rgba(255,193,7,0.5)' : 'none'
              }}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div 
          className="position-absolute bottom-0 start-0 bg-warning"
          style={{
            height: '3px',
            width: `${((currentIndex + 1) / slides.length) * 100}%`,
            transition: 'width 0.5s ease'
          }}
        />
      </div>

      {/* Carousel Controls Info (Hidden, for accessibility) */}
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {slides.length}: {slides[currentIndex].title}
      </div>

      {/* Additional CSS for animations and hover effects */}
      <style jsx>{`
         .carousel-nav-btn:hover {
    // background-color: rgba(255,255,255,1) !important;
  }
  
  .carousel-container:hover .carousel-nav-btn {
    opacity: 1;
  }
  
  .carousel-nav-btn {
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    .carousel-overlay h1 {
      font-size: 2rem !important;
    }
    
    .carousel-overlay p {
      font-size: 1rem !important;
    }
    
    .carousel-nav-btn {
      width: 40px !important;
      height: 40px !important;
      font-size: 1rem !important;
    }
  }
      `}</style>
    </div>
  );
};

export default Carousel;