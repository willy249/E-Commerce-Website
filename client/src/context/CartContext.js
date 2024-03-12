import React, { createContext, useEffect, useState } from "react";

// create context
export const CartContext = new createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // 計算_總數量
  useEffect(() => {
    const amount = cart.reduce((a, c) => {
      return a + c.amount;
    }, 0);

    setItemsAmount(amount);
  }, [cart]);

  // 計算_總價
  useEffect(() => {
    const total = cart.reduce((a, c) => {
      return a + c.attributes.price * c.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // 加入購物車
  const addToCart = (item, id) => {
    const itemID = parseInt(id);
    const newItem = { ...item[0], amount: 1 };

    // 檢查項目是否存在
    const cartItem = cart.find((item) => {
      return item.id === itemID;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === itemID) {
          setAmount(cartItem.amount + 1);
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    // 開啟購物車 cart
    setIsOpen(true);
  };

  // 移除購物車
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // 刪除購物車
  const clearCart = () => {
    setCart([]);
  };

  // handle input
  const handleInput = (e, id) => {
    const value = parseInt(e.target.value);

    // 檢查項目是否存在
    const carItem = cart.find((item) => {
      return item.id === id;
    });
    if (carItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          if (isNaN(value)) {
            setAmount(1);
            return { ...item, amount: 1 }; // 若輸入值非數字，默認數量為 1
          } else {
            setAmount(value);
            return { ...item, amount: value };
          }
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    setIsOpen(true);
  };

  // handle select
  const handleSelect = (e, id) => {
    const value = parseInt(e.target.value);
    // 檢查項目是否存在
    const carItem = cart.find((item) => {
      return item.id === id;
    });
    if (carItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          setAmount(value);
          return { ...item, amount: value };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        addToCart,
        clearCart,
        cart,
        removeFromCart,
        itemsAmount,
        handleSelect,
        handleInput,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
