import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // Convert "$10" → 10
      total += cost * item.quantity; // Multiply by quantity
    });
    return total.toFixed(2); // Return 2 decimal places
  };
  const calculateItemSubtotal = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };
  

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // From props
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove if quantity would go to 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  
  return (
    <div className="cart-container">
    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">Price: {item.cost}</div>
            <div className="cart-item-quantity">
              <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Subtotal: ${calculateItemSubtotal(item)}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
          </div>
        </div>
      ))
    )}

    {cart.length > 0 && (
      <div className="cart-summary">
        <div className="total_cart_amount">Total: ${calculateTotalAmount()}</div>
        <button className="get-started-button1 continue_shopping_btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    )}
  </div>
  
  );
};

export default CartItem;


