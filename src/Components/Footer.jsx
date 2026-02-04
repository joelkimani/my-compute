// import { CompactLogo } from "./Logo";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0b1f4d" }} className=" text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center mb-3">
              {/* <CompactLogo height="40px" /> */}
              <span className="fw-semibold fs-4 ms-2">ComputeHub</span>
            </div>
            <p className="text-secondary mb-4">
              Your trusted technology hub for smart deals and cutting-edge tech solutions.
              Connect with the future of technology today.
            </p>
            <div className="d-flex gap-3">
                <a
                 href="https://facebook.com"
                   target="_blank"
                 rel="noopener noreferrer"
                >
              <Facebook
                className="text-secondary"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "gray")}
              />
              </a>
               <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              <Twitter
                className="text-secondary"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "gray")}
              />
              </a>
              
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              <Instagram
                className="text-secondary"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "gray")}
              />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
               >
              <Linkedin
                className="text-secondary"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "gray")}
              />
              </a>
            </div>
          </div>

          {/* Quick Links */}
         <div className="col-lg-3 col-md-6">
  <h5 className="fw-semibold mb-3">Quick Links</h5>

  {/* List of navigation links */}
  <ul className="list-unstyled">
    {[
      { label: "Deals", url: "/home" },
      { label: "Products", url: "/" },
      { label: "Services", url: "/services" },
      { label: "About Us", url: "/about" },
      { label: "Support", url: "/support" },
    ].map((link, index) => (
      <li key={index} className="mb-2">
        <a
          href={link.url} // Use actual URL here
          className="text-secondary text-decoration-none"
          onMouseOver={(e) => (e.currentTarget.style.color = "white")}
          onMouseOut={(e) => (e.currentTarget.style.color = "gray")}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-semibold mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <Mail className="me-2 text-secondary" />
                <span className="text-secondary">tech@computehub.com</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <Phone className="me-2 text-secondary" />
                <span className="text-secondary">+254 729 522 791</span>
              </li>
              <li className="d-flex align-items-center">
                <MapPin className="me-2 text-secondary" />
                <span className="text-secondary">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-top border-secondary mt-4 pt-3 text-center">
          <p className="text-secondary mb-0">
            © 2025 ComputeHub. All rights reserved. Smart Deals. Smarter Tech.
          </p>
        </div>
      </div>
    </footer>
  );
}
