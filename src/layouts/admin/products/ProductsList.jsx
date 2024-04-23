import { useState, Fragment } from "react";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { removeProductRED } from "../../../redux/common/productsSlice";
import { removeProduct } from "../../../services/dashboard/products";
import { getBrandNameById } from "../../../utils/utils";
import { Box, Paper } from "@mui/material";
import Modal from "../../components/Modal";

function ProductsList() {
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const brandsList = useSelector((state) => state.brands);
  const productsList = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const deleteProduct = async (id) => {
    setLocalLoading(true);
    await removeProduct(id);
    dispatch(removeProductRED(id));
    setLocalLoading(false);
  };

  return localLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <PropagateLoader color="#f76f22" />
    </Box>
  ) : productsList.length ? (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {productsList.map((product) => (
        <Fragment key={product._id}>
          <Paper
            elevation={3}
            square={false}
            className="dataPaper"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="paperOverlay" style={{ height: "220px" }}>
              <img src={product.images[0].url} alt="product image" />

              <div style={{ marginTop: "15px" }}>
                <p className="paperBrandName">
                  {getBrandNameById(product.brandId, brandsList)}
                </p>
                <p className="paperTitle">{product.title}</p>
              </div>
            </div>
          </Paper>
        </Fragment>
      ))}
      {selectedProduct && (
        <Modal
          title="Product"
          data={selectedProduct}
          deleteFunction={(id) => deleteProduct(id)}
          closeModal={() => setSelectedProduct(null)}
        />
      )}
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <h2>You have no products.</h2>
    </Box>
  );
}

export default ProductsList;
