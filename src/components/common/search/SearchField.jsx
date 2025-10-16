import "./search.css";

import React, { useEffect, useRef, useState } from "react";

// Import Link component to navigate between pages without reloading
import { Link } from "react-router-dom";

import SearchResults from "./SearchResults";

// ICONS
import { IoIosSearch } from "react-icons/io";

const SearchField = () => {
  // State to store the search text entered by the user for filtering products
  const [search, setSearch] = useState("");
  // Controls visibility of search suggestions; shown when search input is focused
  const [showList, setShowList] = useState(false);
  // State to store the list of products that match the search query (5 products only)
  const [productsOfSearch, setProductsOfSearch] = useState([]);

  // Reference to the search container element
  const containerRef = useRef(null);

  // Wait 1 second after typing stops, then fetch products from the API based on search
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProductBysearch = async () => {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              search
            )}`
          );
          const data = await res.json();
          setProductsOfSearch(data.products.slice(0, 5));
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductBysearch();
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div className="search" ref={containerRef}>
      <form>
        <input
          type="text"
          placeholder="Search for items"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={() => setShowList(true)}
        />
        <Link
          className={search.length ? "" : "disabled"}
          to={`./search?query=${encodeURIComponent(search)}`}
        >
          <IoIosSearch />
        </Link>
      </form>
      <SearchResults
        showList={showList}
        search={search}
        productsOfSearch={productsOfSearch}
        onSelect={() => setShowList(false)}
      />
    </div>
  );
};

export default React.memo(SearchField);
