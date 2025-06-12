import React, { useState, useEffect, Component } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Une erreur s'est produite. Veuillez recharger la page.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3030/api/produits')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erreur chargement produits:', error))
  }, [])

  const addToCart = (product, quantity = 1, callback) => {
    fetch('http://localhost:3030/api/panierAjout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produitId: product.id, quantite: quantity })
    })
      .then(res => res.json())
      .then(() => {
        setCart([...cart, { ...product, quantity, id: Date.now(), prixUnit: parseFloat(product.prixUnit) || 0 }])
        fetchCartItems()
        if (callback) callback() // Exécute le callback pour basculer
      })
      .catch(error => console.error('Erreur ajout panier:', error))
  }

  const fetchCartItems = () => {
    fetch('http://localhost:3030/api/panier')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const updatedCart = data.map(item => ({
            ...item,
            quantity: item.quantite || 1,
            id: item.id,
            prixUnit: parseFloat(item.prixUnit) || 0,
            nomProd: item.nomProd || 'Unnamed Product',
            image: item.image || 'default.jpg'
          }))
          setCart(updatedCart)
        } else {
          console.warn('Données panier invalides:', data)
          setCart([])
        }
      })
      .catch(error => console.error('Erreur chargement panier:', error))
  }

  const updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id)
    const newQuantity = Math.max(1, (item.quantity || 1) + delta)
    fetch(`http://localhost:3030/api/panierModifier/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantite: newQuantity })
    })
      .then(res => res.json())
      .then(() => {
        setCart(cart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ))
      })
      .catch(error => console.error('Erreur mise à jour quantité:', error))
  }

  const removeFromCart = (id) => {
    fetch(`http://localhost:3030/api/panierSupprimer/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setCart(cart.filter(item => item.id !== id))
      })
      .catch(error => console.error('Erreur suppression panier:', error))
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <div className="app-container">
      <Header cartCount={cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} />
      <main className="main-content">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <ProductList products={products} onViewDetail={setSelectedProduct} />
        )}
        <ErrorBoundary>
          {cart.length > 0 && (
            <Cart
              cartItems={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default App