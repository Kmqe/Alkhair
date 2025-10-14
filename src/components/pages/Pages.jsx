//React Router Components for page rouging
import { Route, Routes } from "react-router-dom";
// Common layout component
import Header from "../common/header/Header";
// Home page
import Home from "../home/Home";
// Contexts for cart and wishlist
import { CartContext, WishListContext } from "../context/ProductsContext";
// Cart Page
import Cart from "./cart/Cart";
// Product details page
import ProductDetails from "./ProductDetails/ProductDetails";
// Wishlist page
import WishList from "./wishlist/WishList";
// Products listing page by category
import ProductsByCategory from "./ProductsByCategory/ProductsByCategory";
// Search Results page
import SearchResults from "./SearchResults/SearchResults";
// Custom hook
import useLocalStorage from "../hooks/useLocalStorage";

const Pages = () => {
  // Initialize cart from localStorage or set it to an empty array
  const [cart, setCart] = useLocalStorage("cart", []);

  // Initialize wishlist from localStorage or set it to an empty array
  const [wishList, setWishList] = useLocalStorage("wish_list", []);

  // Add or remove product from wishlist depending on its current presence
  function handleCLickBtnAddToWishList(product) {
    const find = wishList.some((item) => item.id === product.id);
    if (find) {
      const newListOfWish = wishList.filter((item) => item.id !== product.id);
      setWishList(newListOfWish);
    } else {
      setWishList([...wishList, product]);
    }
  }

  return (
    <>
      {/* Provide cart and wishlist context to the entire app with routing setup*/}
      <CartContext.Provider value={{ cart, setCart }}>
        <WishListContext.Provider
          value={{ wishList, setWishList, handleCLickBtnAddToWishList }}
        >
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route
              path="products/category/:category"
              element={<ProductsByCategory />}
            />
            <Route path="wishlist/" element={<WishList />} />
            <Route path="search" element={<SearchResults />} />
          </Routes>
        </WishListContext.Provider>
      </CartContext.Provider>
    </>
  );
};

export default Pages;
