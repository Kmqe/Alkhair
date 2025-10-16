import "./header.css";

// Import React Hooks
import { useContext, useState } from "react";

import { CartContext } from "../../context/ProductsContext";
import { WishListContext } from "../../context/ProductsContext";

// Custom Hooks
import useScrollY from "../../hooks/useScrollY";
import useWindowWidth from "../../hooks/useWindowWidth";

// Import Link component to navigate between pages without reloading
import { Link } from "react-router-dom";

// ICONS
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import Logo from "../logo/Logo";
import SearchField from "../search/SearchField";

const Header = () => {
  // Custom hook to track and return the current screen width
  const width = useWindowWidth();
  // State to control sidebar visibility (only shown on small screens)
  const [openSideBar, setOpenSideBar] = useState(false);
  // Custom hook that returns the current vertical scroll position
  const scrollY = useScrollY();

  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  return (
    <>
      <header className={`${scrollY >= 200 ? "fixed" : ""}`}>
        <div className="container">
          <Logo />
          <SearchField />
          {width > 768 ? (
            <div className={`box-icon`}>
              <Link to={"/wishlist"} className="icon">
                <FaRegHeart />
                <span className="count">{wishList.length}</span>
              </Link>
              <Link to={"/cart"} className="icon">
                <TiShoppingCart />
                <span className="count">{cart.length}</span>
              </Link>
              <div className="icon">
                <IoPerson />
              </div>
            </div>
          ) : (
            <>
              <button
                className="btn"
                onClick={() => setOpenSideBar(!openSideBar)}
              >
                <FaBars />
              </button>
            </>
          )}
        </div>
      </header>
      <div className={`side-bar ${openSideBar ? "show" : ""}`}>
        <button className="btn" onClick={() => setOpenSideBar(!openSideBar)}>
          <CgClose />
        </button>
        <div className={`box-icon`}>
          <Link
            to={"/wishlist"}
            className="icon"
            onClick={() => setOpenSideBar(false)}
          >
            <FaRegHeart />
            <span className="count">{wishList.length}</span>
          </Link>
          <Link
            to={"/cart"}
            className="icon"
            onClick={() => setOpenSideBar(false)}
          >
            <TiShoppingCart />
            <span className="count">{cart.length}</span>
          </Link>
          <div className="icon" onClick={() => setOpenSideBar(false)}>
            <IoPerson />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
