import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h2>TaaslaLegal</h2>
          <p>
            Plot 23 Jimmy Carter Street,
            <br />
            Hamdala Plaza, Asokoro Abuja, Nigeria
          </p>
          <div className="contact">
            <span>
              <i className="fas fa-phone"></i>08035790088
            </span>
            <span>
              <i className="fas fa-envelope"></i>taaslalegal@gmail.com
            </span>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Useful Links</h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow us</h2>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p />
        Copyright © TaaslaLegal 2022
      </div>
    </footer>
  );
}
