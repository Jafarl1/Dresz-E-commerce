import { useEffect, useState } from "react";
import { formatData } from "../../../utils/utils";
import { useTheme } from "../../../hooks/customHooks";
import { Container } from "/src/styles/mui";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";

function DataContainer({ data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { ifDark } = useTheme();

  const getSearchedData = (data) => {
    if (data.length) {
      setFilteredProducts(data);
    } else {
      setFilteredProducts(formattedData);
    }
  };

  useEffect(() => {
    setFormattedData(formatData(data));
    setFilteredProducts(formatData(data));
  }, [data]);

  return (
    <Container
      maxWidth="xl"
      className={`dataContainer ${ifDark("bg-zinc-800")}`}
    >
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
