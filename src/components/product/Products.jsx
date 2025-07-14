import "./products.css";

import { useContext } from "react";
import { CartContext } from "../context/ProductsContext";
import { WishListContext } from "../context/ProductsContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";

import Card from "./Card";

const Products = ({ category, productsOfArray }) => {
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  return (
    <section className="product">
      <h1>{category.replaceAll("-", " ")}</h1>
      <>
        <Swiper
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
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {productsOfArray.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const inWishList = wishList.some((item) => item.id === product.id);

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
      </>
    </section>
  );
};

export default Products;
