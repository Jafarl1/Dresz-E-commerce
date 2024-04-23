import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getBrandsListRED } from "../../../redux/common/brandsSlice";
import { setLoadingRED } from "../../../redux/loading/loadingSlice";
import { resetForm, isDataValid } from "../../../utils/utils";
// import { useAuth } from "../../../contexts/AuthContext";
import { createBrand, getBrands } from "../../../services/dashboard/brands";
import Swal from "sweetalert2";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import FormInput from "../../components/FormInput";

function AddBrand() {
  const brandFormRef = useRef();
  // const { setLoading } = useAuth();

  const dispatch = useDispatch();
  const [brandData, setBrandData] = useState({
    name: "",
    image: "",
  });

  const uploadBrandImage = (event) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setBrandData((prevState) => ({
        ...prevState,
        image: base64Data,
      }));
    };
    reader.readAsDataURL(image);
  };

  const resetFormData = () => {
    resetForm(brandFormRef);
    setBrandData(
      Object.fromEntries(Object.keys(brandData).map((key) => [key, ""]))
    );
  };

  const addNewBrand = async (e) => {
    e.preventDefault();
    if (isDataValid(brandData)) {
      dispatch(setLoadingRED(true));
      try {
        const response = await createBrand(brandData);
        const { data: createdData } = response.data;
        const newListResponse = await getBrands();
        const { data: newData } = newListResponse.data;
        dispatch(getBrandsListRED(newData));

        Swal.fire({
          icon: "success",
          title: createdData
            ? `Brand ${createdData.name} is created!`
            : "Brand is created successfully!",
          text: "You have successfully created a new brand!",
        });
      } catch (error) {
        console.error("Brand creating error: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unknown error.",
        });
      }
      resetFormData();
    } else {
      alert("Please fill all blanks and upload at least 1 image.");
    }
    dispatch(setLoadingRED(false));
  };

  return (
    <form
      autoComplete="off"
      ref={brandFormRef}
      onSubmit={addNewBrand}
      className="newAnnouncementForm"
    >
      <AccordionDetails className="accordionDetails">
        <div className="accordionDetailsHalfDiv">
          <FormInput
            classname="cabinetSelectComponent"
            type="text"
            label="brand name"
            placeholder="Enter the brand name"
            onchange={(e) =>
              setBrandData((prevState) => ({
                ...prevState,
                name: e,
              }))
            }
          />
          <label htmlFor="brandImage" className="additionalInfo">
            <input
              type="file"
              name="brandImage"
              id="brandImage"
              onChange={uploadBrandImage}
            />
            <div className="photoIcon"></div>
            <ul className="photoRequirements">
              <li>Please upload brand official image.</li>
            </ul>
          </label>
        </div>
      </AccordionDetails>
      <AccordionActions className="accordionButtonsGroup">
        <Button onClick={resetFormData}>Reset</Button>
        <Button type="submit">Agree</Button>
      </AccordionActions>
    </form>
  );
}

export default AddBrand;
