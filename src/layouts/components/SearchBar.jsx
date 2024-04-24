import { useState } from "react";
import { productCategories } from "../../utils/db";
import searchIcon from "../../assets/icons/search-icon.png";

function SearchBar({ type, data, handleSearchedData }) {
  const [searched, setSearched] = useState("");
  const [minPriceValue, setMinPriceValue] = useState("");
  const [maxPriceValue, setMaxPriceValue] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearchedValue = (event) => {
    setSearched(event.target.value.toLowerCase());
  };

  const setMinimumPrice = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    setMinPriceValue(inputValue);
  };

  const setMaximumPrice = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    setMaxPriceValue(inputValue);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const resetFilters = () => {
    setSearched("");
    setMinPriceValue("");
    setMaxPriceValue("");
    setCategory("all");
    handleSearchedData(data);
  };

  const filterItems = () => {
    const filteredData = data.filter((product) => {
      const searchCondition =
        !searched.trim() ||
        product.brand.toLowerCase().includes(searched.toLowerCase()) ||
        product.title.toLowerCase().includes(searched.toLowerCase()) ||
        product.description.toLowerCase().includes(searched.toLowerCase());

      const minPriceCondition =
        !minPriceValue ||
        (product.salePrice
          ? product.salePrice >= minPriceValue
          : product.productPrice >= minPriceValue);

      const maxPriceCondition =
        !maxPriceValue ||
        (product.salePrice
          ? product.salePrice <= maxPriceValue
          : product.productPrice <= maxPriceValue);

      // const categoryContidion = !category || product.description.toLowerCase().includes(category);

      return (
        searchCondition && minPriceCondition && maxPriceCondition
        // && categoryContidion
      );
    });

    handleSearchedData(filteredData);
  };

  return (
    <div className="searchBar">
      <div className="searchInput">
        <input
          type={type}
          placeholder="Search..."
          value={searched}
          onChange={handleSearchedValue}
        />
        <img src={searchIcon} alt="Search" />
      </div>
      <div className="filters">
        <div className="filterInputs">
          <select
            name="productCategory"
            id="productCategory"
            onChange={handleCategory}
            value={category}
          >
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="priceRange">
            <input
              type="text"
              name="minPrice"
              id="minPrice"
              placeholder="Min. price $"
              value={minPriceValue}
              onChange={setMinimumPrice}
            />
            <input
              type="text"
              name="maxPrice"
              id="maxPrice"
              placeholder="Max. price $"
              value={maxPriceValue}
              onChange={setMaximumPrice}
            />
          </div>
        </div>

        <div className="btn-group">
          <button onClick={resetFilters}>Reset</button>
          <button onClick={filterItems}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
