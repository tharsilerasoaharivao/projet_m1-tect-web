import React, { useState } from 'react'

function ProductDetail({ product, onAddToCart, onBack }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart(product, quantity, () => {
      // Callback pour basculer vers la page panier
      onBack() // Retour à ProductList, puis Cart sera affiché
    })
  }

  return (
    <div className="product-detail">
      <button className="back-button" onClick={onBack}>Back</button>
      <div className="detail-content">
        <div className="detail-image-container">
          <img src={`/src/assets/${product.image}`} alt={product.nomProd} className="detail-image" />
          <img src={`/src/assets/${product.image}`} alt={product.nomProd} className="detail-image" />
        </div>
        <div className="detail-info">
          <h3>{product.nomProd}</h3>
          <p>${product.prixUnit.toFixed(2)}</p>
          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button onClick={handleAddToCart} className="add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="detail-description">
        <h3>Description</h3>
        <p>{product.description || 'Energize your look with a fresh take on heritage adidas style. The adidas Daily 3.0 Shoes cut a classic profile with a modern suede upper. Your walk across campus or commute across town has never looked or felt this good.'}</p>
        <ul>
          <li>Regular fit</li>
          <li>Lace closure</li>
          <li>Rubber outsole with vulcanized look</li>
          <li>Imported</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductDetail