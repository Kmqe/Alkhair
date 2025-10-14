import "./cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../../context/ProductsContext";

import cartIsEmpty2 from "../../images/cart_is_empty2.png";

import { Link } from "react-router-dom";

import useWindowWidth from "../../hooks/useWindowWidth";

// ICONS
import { MdDeleteOutline } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

const Cart = () => {
  // Custom hook to track and return the current screen width
  const width = useWindowWidth();

  const { cart } = useContext(CartContext);
  const { setCart } = useContext(CartContext);

  // Calculate subtotal when component loads based on cart items
  const [subTotal, setSubTotal] = useState(() => {
    const total = cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return total ? total : 0;
  });

  // Remove a specific product from the cart by its id
  function handleClickDelete(product) {
    const updateCart = cart.filter((item) => {
      return item.id !== product.id;
    });
    setCart(updateCart);
  }

  // Increase product quantity in cart if stock allows
  function handleClickPlus(product) {
    const updateCart = cart.map((item) => {
      if (item.id !== product.id) {
        return item;
      }
      if (product.quantity >= product.stock) return product;
      setSubTotal((value) => value + product.price);
      return { ...product, quantity: product.quantity + 1 };
    });
    setCart(updateCart);
  }

  // Decrease product quantity in cart if it's more than 1
  function handleClickMinus(product) {
    const updateCart = cart.map((item) => {
      if (item.id !== product.id) {
        return item;
      }
      if (product.quantity == 1) return product;
      setSubTotal((value) => value - product.price);
      return { ...product, quantity: product.quantity - 1 };
    });
    setCart(updateCart);
  }

  return cart.length ? (
    <section className="section cart-page">
      <div className="container">
        <div className="cart_products">
          <div
            className="cart-row"
            style={{ display: width < 992 ? "none" : "" }}
          >
            <h3 className="text-center">DELETE</h3>
            <h3>PRODUCT</h3>
            <h3 className="text-center">PRICE</h3>
            <h3 className="text-center">QUANTITY</h3>
            <h3 className="text-center">TOTAL</h3>
          </div>
          {cart.map((product) => (
            <div className="cart-row" key={product.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: width < 992 ? "flex-start" : "center",
                }}
              >
                <span
                  className="delete_icon"
                  onClick={() => handleClickDelete(product)}
                >
                  <MdDeleteOutline />
                </span>
              </div>
              <div className="product-info">
                <Link to={`/products/${product.id}`}>
                  <img src={product.thumbnail} alt={product.title} />
                </Link>
                <div>
                  <Link className="title" to={`/products/${product.id}`}>
                    <h3 title={product.title}>{product.title}</h3>
                  </Link>
                  <div className="tags">
                    {product.tags.map((tag) => (
                      <Link to={`/products/category/${tag}`} key={tag}>
                        <button className="btn">{tag}</button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="price center">
                <h3>${product.price}</h3>
              </div>
              <div className="quantity center">
                <button
                  className="plus"
                  onClick={() => handleClickPlus(product)}
                >
                  <LuPlus />
                </button>
                <button className="count">{product.quantity}</button>
                <button
                  className="minus"
                  onClick={() => handleClickMinus(product)}
                >
                  <LuMinus />
                </button>
              </div>
              <div
                className="total center"
                style={{ display: width < 992 ? "none" : "" }}
              >
                <h3>${(product.price * product.quantity).toFixed(2)}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_totals">
          <div className="box_subtotal">
            <h3>Subtotal:</h3>
            <h3> ${subTotal.toFixed(2)}</h3>
          </div>
          <button className="btn check-out">Check out</button>
        </div>
      </div>
    </section>
  ) : (
    <section>
      <div className="container cart_empty">
        <img src={cartIsEmpty2} alt={"Cart Is Empty"} />
        <h1>Empty Shopping Cart</h1>
      </div>
    </section>
  );
};

export default Cart;
