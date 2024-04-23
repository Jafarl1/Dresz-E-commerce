import React, { useState, Fragment } from "react";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { removeBrandRED } from "../../../redux/common/brandsSlice";
import { removeBrand } from "../../../services/dashboard/brands";
import { Box, Paper } from "@mui/material";
import Modal from "../../components/Modal";

function BrandsList() {
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const dispatch = useDispatch();

  const brandsList = useSelector((state) => state.brands);

  const deleteBrand = async (id) => {
    setLocalLoading(true);
    await removeBrand(id);
    dispatch(removeBrandRED(id));
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
  ) : brandsList.length ? (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {brandsList.map((brand) => (
        <Fragment key={brand._id}>
          <Paper
            elevation={3}
            square={false}
            className="dataPaper"
            onClick={() => setSelectedBrand(brand)}
          >
            <div className="paperOverlay" style={{ height: "120px" }}>
              <img src={brand.image.url} alt="brand icon" />
            </div>
          </Paper>
        </Fragment>
      ))}
      {selectedBrand && (
        <Modal
          title="Brand"
          data={selectedBrand}
          deleteFunction={(id) => deleteBrand(id)}
          closeModal={() => setSelectedBrand(null)}
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
      <h2>You have no brands.</h2>
    </Box>
  );
}

export default BrandsList;

{
  /* <span>
              created:
              <span>{brand.createdAt}</span>
            </span>
            <span>
              updated:
              <span>{brand.updatedAt}</span>
            </span>
            <span>
              ID:
              <span>{brand._id}</span>
            </span> */
}
{
  /* </div> */
}
{
  /* <div
            className="deleteAdminBtn"
            onClick={() => deleteBrand(brand._id)}
          >
            <img src={deleteIcon} alt="delete" />
          </div> */
}
