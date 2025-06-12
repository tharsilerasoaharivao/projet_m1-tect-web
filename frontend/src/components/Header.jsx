import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ cartCount }) {
  const navigate = useNavigate()

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <header className="header">
      <div className="logo">
        <span role="img" aria-label="sun">🌞</span>
        <h1>SUN CO.</h1>
      </div>
      <button className="cart-button" onClick={handleCartClick}>
        View Cart ({cartCount})
      </button>
    </header>
  )
}

export default Header