import "./wish_list.css";
import { useContext } from "react";
import { CartContext, WishListContext } from "../../context/ProductsContext";
import Card from "../../product/Card";
import "../../product/productSkeleton/ProductSkeleton";

const WishList = () => {
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  return (
    <section className="wish-list">
      <div className="container">
        <h1 className="title-section">My Wish List</h1>
        <div className="products_container">
          {wishList.map((product) => {
            const inWishList = true;
            const inCart = cart.some((item) => item.id === product.id);
            return (
              <Card
                product={product}
                key={product.id}
                inWishList={inWishList}
                inCart={inCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WishList;
