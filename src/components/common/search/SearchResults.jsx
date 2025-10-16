import React from "react";

// Import Link component to navigate between pages without reloading
import { Link } from "react-router-dom";

const SearchResults = ({ showList, search, productsOfSearch, onSelect }) => {
  return (
    <div
      className={`list-of-results ${
        showList && search.length > 0 ? "show" : ""
      }`}
    >
      <ul>
        {search.length > 0
          ? productsOfSearch.map((product) => (
              <li key={product.id} onClick={onSelect}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.images[0]} alt={product.title} />
                  <p title={product.title}>{product.title}</p>
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
export default React.memo(SearchResults);
