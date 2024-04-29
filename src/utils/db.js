export const [HOME, SALE, ABOUT, CONTACTS] = [
  "/layout",
  "sale",
  "about",
  "contacts",
];

export const [COUNTRY, CITY, DISTRICT, STREET, SUIT, POSTALCODE] = [
  "country",
  "city",
  "district",
  "street",
  "suit",
  "postalCode",
];

export const [CARD_HOLDER, PAN, EXP_DATE, CVV, BANK] = [
  "cardHolder",
  "panNumber",
  "expiration_date",
  "cvv",
  'bank_account'
];

export const headerLinks = [
  { name: "Shop now", to: "/layout", aosDuration: 400 },
  { name: "Register", to: "/layout/signin", aosDuration: 800 },
  { name: "Cooperation", to: "/layout/contacts", aosDuration: 1200 },
  { name: "More about", to: "/layout/about", aosDuration: 1800 },
];

export const headerStats = [
  { name: "Partners", value: "26" },
  { name: "Daily deals", value: "300 +" },
  { name: "New products daily", value: "48" },
  { name: "Brands", value: "100 +" },
];

export const mainSections = [
  { name: "home", path: HOME },
  { name: "sale", path: SALE },
  { name: "about", path: ABOUT },
  { name: "contacts", path: CONTACTS },
];

export const userSignPages = [
  { name: "signin", path: "signin" },
  { name: "signup", path: "signup" },
];

export const loggedUserPages = [
  { name: "cabinet", action: "tocabinet" },
  { name: "sign out", action: "signout" },
];

export const productCategories = ["all", "shoes", "clothing", "accessories"];

export const orderSteps = [
  "Shipping address",
  "Payment details",
  "Review your order",
];
