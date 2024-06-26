import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useTheme } from "../../../hooks/customHooks";
import { isAdminOrSuperadmin } from "../../../utils/utils";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Box,
  Container,
  ExpandMoreIcon,
} from "/src/styles/mui";
import AddBrand from "./AddBrand";
import AddProducts from "./AddProducts";
import BrandsList from "./BrandsList";
import ProductsList from "./ProductsList";

function Products() {
  const { loggedUser } = useAuth();
  const { dark } = useTheme();

  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  return loggedUser && isAdminOrSuperadmin(loggedUser) ? (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "calc(100vh - 94px)",
            padding: "20px 0",
          }}
        >
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
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                color: dark && "#d4d4d8",
              }}
            >
              Add a new brand
            </AccordionSummary>
            <AddBrand />
          </Accordion>

          <Accordion
            className="cabinetAccordion"
            expanded={expanded === "panel2"}
            onChange={() => handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Brands list
            </AccordionSummary>
            <BrandsList />
          </Accordion>

          <Accordion
            className="cabinetAccordion"
            expanded={expanded === "panel3"}
            onChange={() => handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Add a new product
            </AccordionSummary>
            <AddProducts />
          </Accordion>

          <Accordion
            className="cabinetAccordion"
            expanded={expanded === "panel4"}
            onChange={() => handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Products List
            </AccordionSummary>
            <ProductsList />
          </Accordion>
        </Box>
      </Container>
    </>
  ) : (
    <Navigate to="/admin" replace={true} />
  );
}

export default Products;
