import { useState } from "react";
import {
  Box,
  Step,
  Stepper,
  StepLabel,
  Button,
  Typography,
} from "/src/styles/mui";
import {
  COUNTRY,
  CITY,
  DISTRICT,
  STREET,
  SUIT,
  POSTALCODE,
  CARD_HOLDER,
  PAN,
  EXP_DATE,
  CVV,
  BANK,
} from "../../../utils/db";
import { orderSteps } from "../../../utils/db";
import Swal from "sweetalert2";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewOrder from "./ReviewOrder";
import { getSingleProduct } from "../../../services/website/products.js";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../services/website/order.js";
import { setCartListRED } from "../../../redux/client/cartSlice.js";

function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [addressDetails, setAddressDetails] = useState({
    [COUNTRY]: "",
    [CITY]: "",
    [DISTRICT]: "",
    [STREET]: "",
    [SUIT]: "",
    [POSTALCODE]: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    [CARD_HOLDER]: "",
    [PAN]: "",
    [EXP_DATE]: "",
    [CVV]: "",
    [BANK]: false,
  });

  const resetDetails = (details, setDetails) => {
    setDetails(
      Object.fromEntries(
        Object.keys(details).map((key) => {
          return [key, ""];
        })
      )
    );
  };

  const handleForm = (setForm, field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: typeof value === "string" ? value.trim() : value,
    }));
  };

  const addressFormValidated = () => {
    return !Object.entries(addressDetails).some(
      (block) => block[0] !== SUIT && !block[1].length
    );
  };

  const paymentFormValidated = () => {
    return (
      paymentDetails[BANK] === true ||
      !Object.entries(paymentDetails).some(
        (block) => block[0] !== BANK && !block[1].length
      )
    );
  };

  const handleNext = () => {
    if (activeStep === orderSteps.length - 1) {
      finishOrder();
    } else if (
      (activeStep === 0 && addressFormValidated()) ||
      (activeStep === 1 && paymentFormValidated())
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert("Fill in the required fields, please.");
    }
  };

  const handleBack = () => {
    resetDetails(
      activeStep === 1 ? addressDetails : paymentDetails,
      activeStep === 1 ? setAddressDetails : setPaymentDetails
    );

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkStock = async () => {
    const promises = cart.map((product) => getSingleProduct(product._id));
    const responses = await Promise.all(promises);
    let serverData = responses
      .map((response) => response.data.data)
      .map((product) => ({
        productId: product._id,
        stock: product.stock,
      }));

    return serverData;
  };

  const finishOrder = async () => {
    const productInDataBase = await checkStock();

    const orderData = {
      products: cart.map((product) => ({
        productId: product._id,
        productCount: product.productCount,
      })),
    };

    console.log(productInDataBase);
    console.log(orderData);

    // order API

    const orderResponse = await createOrder(orderData);
    const { success } = orderResponse.data;

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Thank you for choosing us!",
        text: "Your order has been successfully placed. You can track your orders in your cabinet.",
        footer: '<a href="/layout/clients_cabinet"> My cabinet </a>',
      });
      setActiveStep(0);
      localStorage.removeItem("cart");
      dispatch(setCartListRED([]));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Box className="max-[900px]:px-0 max-[1240px]:px-16 max-[1240px]:w-full w-8/12 p-4">
      <Stepper activeStep={activeStep}>
        {orderSteps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === orderSteps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 2 }}>
            <div className="border border-red-600 w-full h-96 my-6">
              All steps completed - you&apos;re finished{" "}
            </div>
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button className="stepperButton shadow-03" onClick={goToOrderList}>
              My Orders
            </Button>
          </Box>
        </>
      ) : (
        <>
          {activeStep === 0 ? (
            <AddressForm
              handleForm={handleForm}
              setAddressDetails={setAddressDetails}
            />
          ) : activeStep === 1 ? (
            <PaymentForm
              handleForm={handleForm}
              setPaymentDetails={setPaymentDetails}
            />
          ) : (
            <ReviewOrder
              addressDetails={addressDetails}
              paymentDetails={paymentDetails}
            />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className={
                activeStep !== 0 ? "stepperButton shadow-03" : "stepperButton"
              }
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            <Button className="stepperButton shadow-03" onClick={handleNext}>
              {activeStep === orderSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default HorizontalLinearStepper;
