import "./header.css";
// Import the website logo image
import logo from "/images/logo.png";
// Import React Hooks
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/ProductsContext";
import { WishListContext } from "../../context/ProductsContext";

// Import Link component to navigate between pages without reloading
import { Link } from "react-router-dom";

// ICONS
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import useScrollY from "../../hooks/useScrollY";
import useWindowWidth from "../../hooks/useWindowWidth";

const Header = () => {
  // Custom hook to track and return the current screen width
  const width = useWindowWidth();
  // State to control sidebar visibility (only shown on small screens)
  const [openSideBar, setOpenSideBar] = useState(false);
  // Custom hook that returns the current vertical scroll position
  const scrollY = useScrollY();
  // State to store the search text entered by the user for filtering products
  const [inputSearch, setInputSearch] = useState("");
  // State to store the list of products that match the search query (5 products only)
  const [productsOfSearch, setProductsOfSearch] = useState([]);
  // Controls visibility of search suggestions; shown when search input is focused
  const [showListOfSearch, setShowListOfSearch] = useState(false);

  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  // Wait 1 second after typing stops, then fetch products from the API based on inputSearch
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProductByInputSearch = async () => {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${inputSearch}`
          );
          const data = await res.json();
          setProductsOfSearch(data.products.splice(0, 5));
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductByInputSearch();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputSearch]);

  return (
    <>
      <header className={`${scrollY >= 200 ? "fixed" : ""}`}>
        <div className="container">
          <Link className="logo" to={"/"}>
            <img src={logo} />
          </Link>
          <div className="search">
            <form>
              <input
                type="text"
                placeholder="Search for items"
                onChange={(e) => setInputSearch(e.target.value)}
                onFocus={() => setShowListOfSearch(true)}
                onBlur={() => setTimeout(() => setShowListOfSearch(false), 200)}
              />
              <Link
                className={inputSearch.length ? "" : "disabled"}
                to={`./search?query=${inputSearch}`}
              >
                <IoIosSearch />
              </Link>
            </form>
            <div
              className={`list-of-results ${
                showListOfSearch && inputSearch.length > 0 ? "show" : ""
              }`}
            >
              <ul>
                {inputSearch.length > 0
                  ? productsOfSearch.map((product) => (
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <li key={product.id}>
                          <img src={product.images[0]} />
                          <p title={product.title}>{product.title}</p>
                        </li>
                      </Link>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
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
