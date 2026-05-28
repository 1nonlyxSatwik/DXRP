import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './Product.css';
import { currency } from '../config';

const Product = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((e) => e.slug === slug);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/');
      }
    }
  }, [products, slug, navigate]);

  const handleGrabIt = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  if (!product) {
    return <div className="product-loading">LOADING...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-hero-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-content-wrapper">
        <Link to="/" className="return-shop-link">Return to Shop</Link>
        
        <h1 className="product-title">{product.name}</h1>
        <div className="product-price">{currency}{product.price}</div>
        
        <div className="product-description">
          <p>Signature collection piece. Engineered for motion, designed for stillness. Premium construction with minimal aesthetic interruption.</p>
        </div>

        <div className="product-controls">
          <div className="size-selector">
            <span className="control-label">size</span>
            <div className="size-options">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="qty-selector">
            <span className="control-label">qty</span>
            <div className="qty-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
        </div>

        <button 
          className={`grab-it-btn ${isAdding ? 'adding' : ''}`}
          onClick={handleGrabIt}
          disabled={isAdding}
        >
          {isAdding ? 'in the bag ✓' : 'grab it'}
        </button>

        {product.imageHover && (
          <div className="product-gallery">
            <img src={product.imageHover} alt={`${product.name} detail`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
