import React from 'react'

function ProductList({ products, onViewDetail }) {
  const sampleProducts = [
    { id: 1, nomProd: 'Off-White "Out Of Office" sneakers', prixUnit: 232.00, image: 'nike_af.jpg' },
    { id: 2, nomProd: 'Nike Air Force Premium', prixUnit: 200.00, image: 'nike_or.png' },
    { id: 3, nomProd: 'Nike Air Force Premium', prixUnit: 98.23, image: 'nike_multicolor.png' },
    { id: 4, nomProd: 'Adidas DAILY 3.0 SHOES', prixUnit: 98.99, image: 'adidas_or.png' },
  ]

  return (
    <div className="content">
      <div className="promo-banner">
        <div className="promo-text">
          <h2 className="promo-title">25% OFF</h2>
          <h3 className="promo-subtitle">Summer Sale</h3>
          <p className="promo-description">Discover our summer styles with discount</p>
          <button className="shop-now" onClick={() => sampleProducts.length > 0 && onViewDetail(sampleProducts[0])}>
            Shop Now →
          </button>
        </div>
        <img src="/src/assets/offwhite.jpg" alt="Promo Shoe" className="promo-image" />
      </div>
      <h2 className="section-title">Explore our latest drops</h2>
      <div className="product-grid">
        {sampleProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={`/src/assets/${product.image}`} alt={product.nomProd} className="product-image" />
            <h3 className="product-name">{product.nomProd}</h3>
            <p className="product-price">${product.prixUnit.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
