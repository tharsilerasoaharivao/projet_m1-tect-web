import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span role="img" aria-label="wave">🌊</span>
        <h3>SUN CO.</h3>
      </div>
      <p>© 2023 dot.cards text task. All rights reserved</p>
      <div className="social-links">
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
        <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
      </div>
    </footer>
  )
}

export default Footer