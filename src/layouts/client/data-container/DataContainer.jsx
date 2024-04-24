import { useEffect, useState } from "react";
import { getBrandNameById } from "../../../utils/utils";
import { Container } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";

function DataContainer({ data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const formatData = () => {
    const formatted = data.products.map((product) => {
      return {
        ...product,
        brand: getBrandNameById(product.brandId, data.brands),
      };
    });

    setFormattedData(formatted);
    setFilteredProducts(formatted);
  };

  const getSearchedData = (data) => {
    if (data.length) {
      setFilteredProducts(data);
    } else {
      setFilteredProducts(formattedData);
    }
  };

  useEffect(() => {
    formatData();
  }, [data]);

  return (
    <Container maxWidth="xl" className="dataContainer">
      <SearchBar
        type="text"
        data={formattedData}
        handleSearchedData={getSearchedData}
      />
      <div className="dataContainerContent">
        {filteredProducts.length ? (
          filteredProducts.map(
            (product) =>
              product.stock > 0 && <Card product={product} key={product._id} />
          )
        ) : (
          <h1>No products found.</h1>
        )}
      </div>
    </Container>
  );
}

export default DataContainer;
