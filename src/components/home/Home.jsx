import Products from "../product/Products";
import ProductSkeleton from "../product/productSkeleton/ProductSkeleton";
import { useEffect, useState } from "react";

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "smartphones",
  "mobile-accessories",
  "skin-care",
  "sunglasses",
  "tablets",
  "tops",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const Home = () => {
  // State to store all fetched products grouped by category
  const [allProducts, setAllProducts] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch data for each category in parallel using Promise.all
        const results = await Promise.all(
          categories.map(async (cat) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${cat}`
            );
            const data = await res.json();
            return { category: cat, products: data.products };
          })
        );
        setAllProducts(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <ProductSkeleton />
      ) : (
        allProducts.map((item, index) => {
          return (
            <Products
              key={index}
              productsOfArray={item.products}
              category={item.category}
              loading={loading}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
