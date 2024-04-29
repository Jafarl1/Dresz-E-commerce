import { useState } from "react";
import { FormLabel, Grid, OutlinedInput } from "/src/styles/mui";
import {
  COUNTRY,
  CITY,
  DISTRICT,
  STREET,
  SUIT,
  POSTALCODE,
} from "../../../utils/db";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ handleForm, setAddressDetails }) {
  return (
    <Grid container spacing={2} className="p-6">
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          onChange={(e) => handleForm(setAddressDetails, STREET, e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc."
          autoComplete="shipping address-line2"
          required
          onChange={(e) => handleForm(setAddressDetails, SUIT, e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="Baku"
          autoComplete="City"
          required
          onChange={(e) => handleForm(setAddressDetails, CITY, e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          District
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="Yasamal"
          autoComplete="State"
          required
          onChange={(e) => handleForm(setAddressDetails, DISTRICT, e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="AZ1000"
          autoComplete="shipping postal-code"
          required
          onChange={(e) => handleForm(setAddressDetails, POSTALCODE, e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="Azerbaijan"
          autoComplete="shipping country"
          required
          onChange={(e) => handleForm(setAddressDetails, COUNTRY, e.target.value)}
        />
      </FormGrid>
    </Grid>
  );
}
