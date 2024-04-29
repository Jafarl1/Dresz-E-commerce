import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminsListRED } from "../../../redux/admin/adminsSlice";
import { setLoadingRED } from "../../../redux/loading/loadingSlice";
import { useAuth, useTheme } from "../../../hooks/customHooks";
import { getAdmins, registerAdmin } from "../../../services/dashboard/admins";
import { isSuperadmin } from "../../../utils/utils";
import AdminsList from "./AdminsList";
import Loader from "../../components/Loader";
import FormInput from "../../components/FormInput";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  Button,
} from "/src/styles/mui";
import { BorderColor } from "@mui/icons-material";

function Admins() {
  const formRef = useRef();
  const { loggedUser } = useAuth();
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const loadingRed = useSelector((state) => state.loading);

  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleFormData = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const resetFormData = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(setLoadingRED(true));
    try {
      const response = await registerAdmin(formData);
      const { user: adminData } = response.data.data;
      const newListResponse = await getAdmins();
      const { data: newData } = newListResponse.data;
      dispatch(getAdminsListRED(newData));

      Swal.fire({
        icon: "success",
        title:
          adminData.name && adminData.surname
            ? `You have created admin ${adminData.name} ${adminData.surname}!`
            : "Done!",
        text: "You have successfully created a new admin!",
      });
    } catch (error) {
      console.error("Admin register error: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message
          ? `${error.response.data.message}.`
          : "Unknown error.",
      });
    } finally {
      dispatch(setLoadingRED(false));
    }
    resetFormData();
  };

  return loadingRed ? (
    <Loader />
  ) : loggedUser && isSuperadmin(loggedUser) ? (
    <>
      <Container maxWidth="xl">
        <Box sx={{ minHeight: "calc(100vh - 94px)", padding: "20px 0" }}>
          <Accordion
            className="cabinetAccordion"
            expanded={expanded === "panel1"}
            onChange={() => handleChange("panel1")}
            sx={{
              backgroundColor: dark && "#27272a",
              boxShadow: dark && "0px 0.5px 2px 0px #d4d4d8",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{
                color: dark && "#d4d4d8",
              }}
            >
              Add a new admin
            </AccordionSummary>

            <form
              ref={formRef}
              onSubmit={submitForm}
              className="newAnnouncementForm"
            >
              <AccordionDetails className="accordionDetails">
                <div className="accordionDetailsHalfDiv">
                  <FormInput
                    classname="cabinetSelectComponent"
                    type="text"
                    label="name"
                    placeholder="Enter the name"
                    onchange={(value) => handleFormData("name", value)}
                  />
                  <FormInput
                    classname="cabinetSelectComponent"
                    type="text"
                    label="surname"
                    placeholder="Enter the surname"
                    onchange={(value) => handleFormData("surname", value)}
                  />
                </div>
                <div className="accordionDetailsHalfDiv">
                  <FormInput
                    classname="cabinetSelectComponent"
                    type="email"
                    label="email"
                    placeholder="Enter the email"
                    onchange={(value) => handleFormData("email", value)}
                  />
                  <FormInput
                    classname="cabinetSelectComponent"
                    type="text"
                    label="password"
                    placeholder="Enter the password"
                    onchange={(value) => handleFormData("password", value)}
                  />
                </div>
              </AccordionDetails>
              <AccordionActions className="accordionButtonsGroup">
                <Button onClick={resetFormData}>Reset</Button>
                <Button type="submit">Agree</Button>
              </AccordionActions>
            </form>
          </Accordion>

          <Accordion
            className="cabinetAccordion"
            expanded={expanded === "panel2"}
            onChange={() => handleChange("panel2")}
            sx={{
              backgroundColor: dark && "#27272a",
              boxShadow: dark && "0px 0.5px 2px 0px #d4d4d8",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                color: dark && "#d4d4d8",
              }}
            >
              Admins list
            </AccordionSummary>
            <AccordionDetails>
              <AdminsList />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/admin" replace={true} />
  );
}

export default Admins;
