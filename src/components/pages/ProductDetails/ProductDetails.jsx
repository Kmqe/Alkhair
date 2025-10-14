import "./product_details.css";
// Import the format function from date-fns to format dates
import { format } from "date-fns";
// Import React Hooks
import { useContext, useEffect, useState } from "react";
// Get URL parameters using useParams from react-router-dom
import { useParams } from "react-router-dom";
// Import Cart and WishList contexts to access shared data
import { CartContext, WishListContext } from "../../context/ProductsContext";

// ICONS
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { BsCartCheck } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";

// Import the loading skeleton component for product details
import ProductDetailsSkeleton from "./productDetailsSkeleton/ProductDetailsSkeleton";
// Import the Card component to display a product
import Card from "../../product/Card";
import ScrollToTop from "../../ScrollToTop";
import { getRatingArray } from "../../../helpers/utils";

const ProductDetails = () => {
  // Store the fetched product data
  const [product, setProduct] = useState({});
  // Track loading state while fetching product
  const [loading, setLoading] = useState(true);
  // Main product image shown on product details page
  const [imgProduct, setImgProduct] = useState("");
  // Index of the currently displayed main image
  const [activeImg, setActiveImg] = useState(0);
  // State to check if the product is in the cart
  const [inCart, setInCart] = useState(false);
  // State to store product rating as an array (used for stars display)
  const [rating, setRating] = useState([0]);
  // State to store product reviews
  const [reviews, setReviews] = useState([]);
  // State to store products fetched from the category API
  const [categoryProducts, setCategoryProducts] = useState([]);

  const { cart, setAddToCart } = useContext(CartContext);
  const { wishList, handleCLickBtnAddToWishList } = useContext(WishListContext);
  // Get the product ID from the URL parameters
  const { id } = useParams();

  // Check if the current product is in the wish list
  const inWishList = wishList.some((item) => item.id === product.id);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the main product by ID
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();

        // Fetch products from same category
        const categoryResponse = await fetch(
          `https://dummyjson.com/products/category/${product.category}`
        );
        const category = await categoryResponse.json();

        setProduct(product);
        setReviews(product.reviews);
        setLoading(false);
        setImgProduct(product.images[0]);
        setRating(getRatingArray(product.rating));
        setCategoryProducts(category.products);
      } catch (error) {
        console.log("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Check if the product is in the cart and update inCart state
  useEffect(() => {
    const isInCart = cart.some((prod) => prod.id === product.id);
    setInCart(isInCart);
  }, [loading, cart, product.id]);

  function handleClickBtnAddToCart() {
    setAddToCart([...cart, { ...product, quantity: 1 }]);
    setInCart(true);
  }

  return loading ? (
    <ProductDetailsSkeleton />
  ) : (
    <section className="product_details">
      <ScrollToTop />
      <div className="container">
        <div className="row1">
          <div className="imgs_items">
            <div className="big_img">
              <img src={imgProduct} alt={product.title} />
            </div>
            <div className="small_imgs">
              {product.images.map((img, index) => (
                <img
                  className={activeImg === index ? "active" : ""}
                  src={img}
                  key={index}
                  onClick={() => {
                    setImgProduct(img);
                    setActiveImg(index);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="product_info">
            <h1 className="title-section">{product.title}</h1>
            <div className="rating">
              {rating.map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <h2 className="price">${product.price}</h2>
            <strong className="availability strong">
              Availability: <span>{product.availabilityStatus}</span>
            </strong>
            {product.brand ? (
              <strong className="brand strong">
                Brand: <span>{product.brand}</span>
              </strong>
            ) : (
              ""
            )}
            <p className="description">{product.description}</p>

            <div className="action_product">
              <span
                className={`${inWishList ? "in-wish-list" : ""}`}
                onClick={() => {
                  handleCLickBtnAddToWishList(product);
                }}
              >
                {" "}
                {inWishList ? <FaHeart /> : <FaRegHeart />}
              </span>
              <span>
                <FaShare />
              </span>
            </div>

            <button
              className={`btn ${inCart ? "active" : ""}`}
              onClick={() => handleClickBtnAddToCart()}
            >
              {inCart ? (
                <>
                  <BsCartCheck />
                  Item In Cart
                </>
              ) : (
                <div>
                  <TiShoppingCart />
                  Add To Cart
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="products-category">
          <h1 className="title-section">{product.category}</h1>
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {categoryProducts.map((product) => {
              const inCart = cart.some((item) => item.id === product.id);
              const inWishList = wishList.some(
                (item) => item.id === product.id
              );

              return (
                <SwiperSlide key={product.id}>
                  <Card
                    product={product}
                    inCart={inCart}
                    inWishList={inWishList}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="comments-content">
          <h1>Reviews</h1>
          {reviews.map((review, index) => {
            return (
              <div className="comment-block" key={index}>
                <div className="customer-info">
                  <span className="avtar">{review.reviewerName.charAt(0)}</span>
                  <div className="name-date">
                    <p className="customer-name">{review.reviewerName}</p>
                    {/* <p className="date-publish">{review.date}</p> */}
                    <p className="date-publish">
                      {format(review.date, "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="customer-rating">
                  {Array(5)
                    .fill(0)
                    .map((star, index) =>
                      review.rating < index + 1 ? (
                        <FaStar key={index} color="ccc" />
                      ) : (
                        <FaStar
                          key={index}
                          className={`stars-${review.rating}`}
                        />
                      )
                    )}
                </div>
                <p className="customer-comment">{review.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
