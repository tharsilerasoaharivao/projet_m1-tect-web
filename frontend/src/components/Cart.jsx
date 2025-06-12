import React from 'react'

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.prixUnit * item.quantity, 0)
  const shipping = 20.00
  const tax = 6.00
  const discount = -6.00
  const total = subtotal + shipping + tax + discount

  return (
    <div className="cart">
      <h2>Your Bag</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={`/src/assets/${item.image}`} alt={item.nomProd} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.nomProd}</h3>
              <p>${item.prixUnit.toFixed(2)}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <div className="summary-item">Subtotal <span>${subtotal.toFixed(2)}</span></div>
        <div className="summary-item">Shipping and delivery <span>${shipping.toFixed(2)}</span></div>
        <div className="summary-item">Tax <span>${tax.toFixed(2)}</span></div>
        <div className="summary-item discount">Discount <span>${discount.toFixed(2)}</span></div>
        <div className="summary-item total">Total <span>${total.toFixed(2)}</span></div>
        <button className="checkout-button">Checkout →</button>
      </div>
    </div>
  )
}

export default Cart