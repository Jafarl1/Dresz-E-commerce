import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCartListRED } from "../../../redux/client/cartSlice";
import { getCartData } from "../../../services/website/basket";
import { getSingleProduct } from "../../../services/website/products";
import { setLoadingRED } from "../../../redux/loading/loadingSlice";
import Loader from "../../components/Loader";

function ClientsCabinet() {
  const loadingRed = useSelector((state) => state.loading);

  return loadingRed ? <Loader /> : <div>ClientsCabinet</div>;
}

export default ClientsCabinet;

// import { useState, useRef, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";
// import {
//   MOTOS,
//   PARTS_ACCESSORIES,
//   mainSections,
//   brands,
//   body_types,
//   colors,
//   drive_types,
//   fuel_types,
//   engine_capacities,
//   transmissions,
// } from "../../../utils/db";
// import Select from "../../components/Select";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
// import FormInput from "./FormInput";
// import AnnouncementType from "./AnnouncementType";

// function ClientsCabinet() {
//   const formRef = useRef();
//   const { loading, loggedUser } = useAuth();

//   const [announcementType, setAnnouncementType] = useState(
//     mainSections[0].path
//   );
//   const [brandsList, setBrandsList] = useState();
//   const [bodyTypes, setBodyTypes] = useState();
//   const [selectedBrandModels, setSelectedBrandModels] = useState();
//   const [formData, setFormData] = useState({
//     category: "",
//     brand: "",
//     model: "",
//     bodyType: "",
//     color: "",
//     driveType: "",
//     fuelType: "",
//     engineCapacity: "",
//     transmission: "",
//     power: "",
//     year: "",
//     odometer: "",
//     price: "",
//     info: "",
//     images: [],
//   });

//   const handleFormData = (fieldName, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [fieldName]: value,
//     }));
//   };

//   const getModelsOfSelectedBrand = (value) => {
//     if (!value) setSelectedBrandModels(undefined);

//     brandsList.forEach((brand) => {
//       if (brand.name === value) setSelectedBrandModels(brand.models);
//     });
//   };

//   const selectBrand = (value) => {
//     handleFormData("brand", value);
//     getModelsOfSelectedBrand(value);
//   };

//   const setBrandsByAnnouncementType = () => {
//     const currentBrands = brands.find(
//       (brand) => brand.brand_type === announcementType
//     );
//     setBrandsList(currentBrands.brands_list);
//     setSelectedBrandModels([]);
//   };

//   const setBodyTypesByAnnouncementType = () => {
//     const currentBodyTypes = body_types.find(
//       (type) => type.name === announcementType
//     );
//     if (currentBodyTypes) {
//       setBodyTypes(currentBodyTypes.types);
//     }

//     resetFormData();
//   };

//   const checkingDataByType = (boolean, type, data) => {
//     let condition = [];

//     if (Array.isArray(type)) {
//       type.map((t) => condition.push(announcementType === t));
//     } else {
//       condition = [announcementType === type];
//     }

//     if (boolean) {
//       return condition.includes(true) ? data : "";
//     } else {
//       return condition.includes(true) ? "" : data;
//     }
//   };

//   const uploadImage = (event) => {
//     const image = event.target.files[0];

//     // const reader = new FileReader();
//     // reader.onloadend = () => {
//     //   const base64Data = reader.result;
//     //   console.log(base64Data);
//     // };
//     // reader.readAsDataURL(image);

//     setFormData((prevState) => ({
//       ...prevState,
//       images: [...prevState.images, image],
//     }));
//   };

//   const resetFormData = () => {
//     if (formRef.current) {
//       formRef.current.reset();
//     }
//     setFormData(
//       Object.fromEntries(
//         Object.keys(formData).map((key) => {
//           if (key !== "category" && key !== "owner") {
//             return [key, ""];
//           } else {
//             return [key, formData[key]];
//           }
//         })
//       )
//     );
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     // request.
//     resetFormData();
//   };

//   useEffect(() => {
//     setBrandsByAnnouncementType();
//     setBodyTypesByAnnouncementType();

//     setFormData((prevState) => ({
//       ...prevState,
//       category: announcementType,
//       owner: loggedUser.email,
//     }));
//   }, [announcementType]);

//   console.log(formData);

//   return loading ? (
//     <Loader />
//   ) : loggedUser && loggedUser.role === "client" ? (
//     <>
//       <Container maxWidth="xl">
//         <Box sx={{ minHeight: "calc(100vh - 94px)", padding: "20px 0" }}>
//           <h2 className="userGreeting">
//             Hello, {loggedUser.name} {loggedUser.surname} !
//           </h2>
//           <Accordion defaultExpanded className="cabinetAccordion">
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel3-content"
//               id="panel3-header"
//             >
//               Add a new announcement
//             </AccordionSummary>
//             <AccordionDetails className="accordionTop">
//               <h3> Choose the type: </h3>
//               <form className="announcementTypeForm">
//                 {mainSections.map((section) => (
//                   <AnnouncementType
//                     key={section.path}
//                     section={section}
//                     setAnnouncementType={setAnnouncementType}
//                   />
//                 ))}
//               </form>
//             </AccordionDetails>

//             <form
//               ref={formRef}
//               onSubmit={submitForm}
//               className="newAnnouncementForm"
//             >
//               <AccordionDetails className="accordionDetails">
//                 <div className="accordionDetailsHalfDiv">
//                   <Select
//                     classname="cabinetSelectComponent"
//                     label="brand"
//                     data={brandsList}
//                     selected={selectBrand}
//                   />
//                   <Select
//                     classname="cabinetSelectComponent"
//                     label="models"
//                     data={selectedBrandModels}
//                     selected={(value) => handleFormData("model", value)}
//                   />
//                   {checkingDataByType(
//                     false,
//                     PARTS_ACCESSORIES,
//                     <Select
//                       classname="cabinetSelectComponent"
//                       label="body type"
//                       data={bodyTypes}
//                       selected={(value) => handleFormData("bodyType", value)}
//                     />
//                   )}
//                   <Select
//                     classname="cabinetSelectComponent"
//                     label="color"
//                     data={colors}
//                     selected={(value) => handleFormData("color", value)}
//                   />
//                   {checkingDataByType(
//                     false,
//                     PARTS_ACCESSORIES,
//                     <Select
//                       classname="cabinetSelectComponent"
//                       label="drive"
//                       data={drive_types}
//                       selected={(value) => handleFormData("driveType", value)}
//                     />
//                   )}
//                   {checkingDataByType(
//                     false,
//                     PARTS_ACCESSORIES,
//                     <Select
//                       classname="cabinetSelectComponent"
//                       label="fuel"
//                       data={fuel_types}
//                       selected={(value) => handleFormData("fuelType", value)}
//                     />
//                   )}
//                 </div>
//                 <div className="accordionDetailsHalfDiv">
//                   {checkingDataByType(
//                     false,
//                     PARTS_ACCESSORIES,
//                     <Select
//                       classname="cabinetSelectComponent"
//                       label="engine capacity"
//                       data={engine_capacities}
//                       selected={(value) =>
//                         handleFormData("engineCapacity", value)
//                       }
//                     />
//                   )}
//                   {checkingDataByType(
//                     false,
//                     [MOTOS, PARTS_ACCESSORIES],
//                     <Select
//                       classname="cabinetSelectComponent"
//                       label="transmission"
//                       data={transmissions}
//                       selected={(value) =>
//                         handleFormData("transmission", value)
//                       }
//                     />
//                   )}
//                   {checkingDataByType(
//                     false,
//                     PARTS_ACCESSORIES,
//                     <FormInput
//                       classname="cabinetSelectComponent"
//                       type="number"
//                       label="power, hp"
//                       placeholder="Enter the horsepower of the engine"
//                       onchange={(value) => handleFormData("power", value)}
//                     />
//                   )}
//                   <FormInput
//                     classname="cabinetSelectComponent"
//                     type="number"
//                     label="year"
//                     placeholder="Enter the year of release"
//                     onchange={(value) => handleFormData("year", value)}
//                   />
//                   <FormInput
//                     classname="cabinetSelectComponent"
//                     type="number"
//                     label="odometer"
//                     placeholder="Enter the odometer value"
//                     onchange={(value) => handleFormData("odometer", value)}
//                   />
//                   <FormInput
//                     classname="cabinetSelectComponent"
//                     type="number"
//                     label="price, usd"
//                     placeholder="Enter the price in usd"
//                     onchange={(value) => handleFormData("price", value)}
//                   />
//                 </div>
//               </AccordionDetails>
//               <AccordionDetails className="accordionDetails">
//                 <div className="accordionDetailsHalfDiv">
//                   <label htmlFor="photo" className="additionalInfo">
//                     <input
//                       type="file"
//                       name="photo"
//                       id="photo"
//                       onChange={uploadImage}
//                     />
//                     <div className="photoIcon"></div>
//                     <ul className="photoRequirements">
//                       <li>Minimum 3 images.</li>
//                       <li>Optimal size is 1024x768.</li>
//                       <li>
//                         Please upload some photos where your product is clearly
//                         visible from all sides.
//                       </li>
//                     </ul>
//                   </label>
//                 </div>
//                 <div className="accordionDetailsHalfDiv">
//                   <textarea
//                     name="additionalInfo"
//                     className="additionalInfo"
//                     id="additionalInfo"
//                     onChange={(e) => handleFormData("info", e.target.value)}
//                   ></textarea>
//                 </div>
//               </AccordionDetails>
//               <AccordionActions className="accordionButtonsGroup">
//                 <Button onClick={resetFormData}>Reset</Button>
//                 <Button type="submit">Agree</Button>
//               </AccordionActions>
//             </form>
//           </Accordion>

//           <Accordion className="cabinetAccordion">
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1-content"
//               id="panel1-header"
//             >
//               Accordion 1
//             </AccordionSummary>
//             <AccordionDetails>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//               eget.
//             </AccordionDetails>
//           </Accordion>

//           <Accordion className="cabinetAccordion">
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel2-content"
//               id="panel2-header"
//             >
//               Accordion 2
//             </AccordionSummary>
//             <AccordionDetails>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
//               eget.
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </Container>
//     </>
//   ) : (
//     <Navigate to="/layout/signin" replace={true} />
//   );
// }

// export default ClientsCabinet;
