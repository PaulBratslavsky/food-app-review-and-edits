import { useState, createContext, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import { client } from "@/pages/_app.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cartCookie = Cookie.get("cart") !== "undefined" ? Cookie.get("cart") : null;
  
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(true);
  const [cart, setCart] = useState(cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    let newItem = cart.items.find(i => i.id === item.id);
    if (!newItem) {
      const newItem = {
        quantity: 1,
        ...item,
      };
      setCart(prevCart => ({
        items: [...prevCart.items, newItem],
        total: prevCart.total + item.attributes.price,
      }));
    } else {
      setCart(prevCart => ({
        items: prevCart.items.map(i =>
          i.id === newItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
        total: prevCart.total + item.attributes.price,
      }));
    }
  };

  const removeItem = item => {
    let newItem = cart.items.find(i => i.id === item.id);
    if (newItem.quantity > 1) {
      setCart(prevCart => ({
        items: prevCart.items.map(i =>
          i.id === newItem.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
        total: prevCart.total - item.attributes.price,
      }));
    } else {
      setCart(prevCart => ({
        items: prevCart.items.filter(i => i.id !== item.id),
        total: prevCart.total - item.attributes.price,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cart, addItem, removeItem, showCart, setShowCart }}>
      {children}
    </AuthContext.Provider>
  );
};

const getUser = async () => {
  const token = Cookie.get("token");
  if (!token) return null;
  const { data } = await client.query({
    query: gql`
      query {
        me {
          id
          email
          username
        }
      }
    `,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return data.me;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
