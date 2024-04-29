import * as React from "react";

import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
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
import { useAuth } from "../../../hooks/customHooks";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type:", detail: "Visa" },
  { name: "Card holder:", detail: "Mr. John Smith" },
  { name: "Card number:", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date:", detail: "04/2024" },
];

export default function ReviewOrder({ addressDetails, paymentDetails }) {
  const { loggedUser } = useAuth();
  return (
    <Stack spacing={2} className="p-6">
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Payment details
          </Typography>
          <Typography gutterBottom>
            {loggedUser.name} {loggedUser.surname}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            {addressDetails[COUNTRY]}, {addressDetails[DISTRICT]},{" "}
            {addressDetails[CITY]}, {addressDetails[STREET]},{" "}
            {addressDetails[SUIT]}, {addressDetails[POSTALCODE]}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Payment details
          </Typography>
          <Grid>
            {paymentDetails[BANK] ? (
              <p className="mont">
                We expect you to make a transfer using our bank details. If you
                want to pay with a card, go back to the previous page, select
                the card payment method and enter your card details, please.
              </p>
            ) : (
              <>
                <p className="mont">
                  <span className="mont text-sm mr-2"> Card holder: </span>
                  {paymentDetails[CARD_HOLDER]}
                </p>
                <p className="mont">
                  <span className="mont text-sm mr-2"> Pan number: </span>
                  {paymentDetails[PAN]}
                </p>
                <p className="mont">
                  <span className="mont text-sm mr-2"> Card holder: </span>
                  {paymentDetails[EXP_DATE]}
                </p>
              </>
            )}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
