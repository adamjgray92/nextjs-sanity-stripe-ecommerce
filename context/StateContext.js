import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct;
  let index;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const onAdd = (product, qty) => {
    console.log('shf');
    const isProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prev) => prev + product.price * qty);
    setTotalQuantities((prev) => prev + qty);
    setQuantity(1);

    if (isProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + qty,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = qty;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const removeCartItem = (id) => {
    const cartItem = cartItems.find((item) => item._id === id);
    setCartItems([...cartItems.filter((item) => item._id !== id)]);
    setTotalQuantities((prev) => prev - cartItem.quantity);
    setTotalPrice((prev) => prev - cartItem.quantity * cartItem.price);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === 'increment') {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === 'decrement') {
      if (foundProduct.quantity > 1) {
        setCartItems((prev) =>
          prev.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
        );
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantities((prev) => prev - 1);
      } else {
        removeCartItem(id);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
