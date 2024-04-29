import { useState } from "react";
import { useTheme } from "../../hooks/customHooks";
import { productCategories } from "../../utils/db";
import searchIcon from "../../assets/icons/search-icon.png";
import searchIconLight from "../../assets/icons/darkTheme/search-icon-light.png";

function SearchBar({ type, data, handleSearchedData }) {
  const [searched, setSearched] = useState("");
  const [minPriceValue, setMinPriceValue] = useState("");
  const [maxPriceValue, setMaxPriceValue] = useState("");
  const [category, setCategory] = useState("all");
  const { dark } = useTheme();

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
    <div
      className={`flex flex-col justify-center items-center gap-5 py-5 mb-5 transition-all
      ${dark && "bg-zinc-800"}`}
    >
      <div className="w-4/5 flex justify-center relative">
        <input
          className={`w-full rounded-md focus:outline-none px-3 py-1.5 pr-9 text-sm border border-zinc-300 mont transition-all
          ${dark && "bg-zinc-800 text-zinc-300"}`}
          type={type}
          placeholder="Search..."
          value={searched}
          onChange={handleSearchedValue}
        />
        <img
          src={dark ? searchIconLight : searchIcon}
          className="h-4/5 absolute top-1 right-1"
          alt="Search"
        />
      </div>
      <div
        className="max-[900px]:flex-col w-4/5 flex justify-center items-center gap-y-4"
        style={{ columnGap: "5vw" }}
      >
        <div
          className="max-[650px]:flex-col flex justify-center items-center gap-y-4"
          style={{ columnGap: "5vw" }}
        >
          <select
            className={`max-[650px]:w-full w-52 h-8 py-0.5 px-1 mont capitalize text-sm border border-zinc-300 rounded outline-none cursor-pointer transition-all
            ${dark && "bg-zinc-800 text-zinc-300"}`}
            name="productCategory"
            id="productCategory"
            onChange={handleCategory}
            value={category}
          >
            {productCategories.map((category) => (
              <option className="mont" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="max-[650px]:w-full w-52 h-8 mont border border-zinc-300 rounded flex overflow-hidden">
            <input
              className={`w-1/2 py-1 px-2 outline-none text-xs border-r border-zinc-300 transition-all
              ${dark && "bg-zinc-800 text-zinc-300"}`}
              type="text"
              name="minPrice"
              id="minPrice"
              placeholder="Min. price $"
              value={minPriceValue}
              onChange={setMinimumPrice}
            />
            <input
              className={`w-1/2 py-1 px-2 outline-none text-xs transition-all
              ${dark && "bg-zinc-800 text-zinc-300"}`}
              type="text"
              name="maxPrice"
              id="maxPrice"
              placeholder="Max. price $"
              value={maxPriceValue}
              onChange={setMaximumPrice}
            />
          </div>
        </div>
        <div
          className="flex justify-center items-center max-[650px]:w-full"
          style={{ gap: "5vw" }}
        >
          <button
            className={`max-[650px]:w-1/3 w-24 h-8 px-5 border flex justify-center items-center mont transition-all border-zinc-300 rounded bg-white
            ${dark && "bg-zinc-800 text-zinc-300"}`}
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className={`max-[650px]:w-1/3 w-24 h-8 px-5 border flex justify-center items-center mont transition-all border-zinc-300 rounded bg-white
            ${dark && "bg-zinc-800 text-zinc-300"}`}
            onClick={filterItems}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
