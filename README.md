# DRESZ

https://dresz.vercel.app

This E-Commerce project is a full-fledged online shopping platform built using Vite and React. Below you'll find all the information you need to get started, understand the project structure, and contribute to its development.

## Technologies (Development)

- Vite + React
- Redux Toolkit
- Context API
- localStorage
- axios

## Libraries and tools (Stylization)

- MUI
- Tailwind
- AOS
- Swal

## Installation and launch

1. Clone the repository: `git clone https://github.com/Jafarl1/Dresz-E-commerce.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Functionality

You can visit the website both as a customer and as an administrator (/admin).

**CLIENT**

Visiting the site firstly, you can go to the main page by clicking on the **SHOW NOW** button. Here you can view products, search for the product you need by name, brand, or using different filters. You can add products to _favorites_ or to the _shopping cart_ and delete them from there by clicking the corresponding icons on the product. This information will be stored in your browser's local storage.
You can register on the **Sign Up** page, and then log in to your account on the **Sign In** page. Also you can use this credentials _(email: randomclient@gmail.com , password: 12345)_ for sign in. When you sign in to your account, the products that you had in your shopping cart are saved on the server. If identical products are already stored in your account, they will not be added there again. If the product that you have in your shopping cart has been disabled by admin, you will see the inscription not active on this product. You can only remove this product. But if it is re-enabled by the admin, you will be able to go to the product page again and then to the payment page.

**ADMIN**

You can also visit the website as an **administrator** (/admin). Administrator credentials are _(email: randomadmin@gmail.com , password: 12345)_. From the admin panel, you can see certain statistics, add/remove brands and products, as well as turn on/off the display of products.

There is also 1 superadmin account from where I can do the same as with the admin account + add/remove admins.

---

You will not be able to log into the admin account with the customer's credentials, and vice versa. Also, you will not be able to visit account page by writing the address in the url bar if you have not signed in.
After signing out of the client's account, the data in the cart that was saved in the local storage is deleted (this has nothing to do with the data on the server). If you have already signed into the client's account, and without leaving there you went to the administrator's login page and signed into the administrator's account, an automatic sign out will be performed from the client's account, and in this case the data in the cart that was saved in the locale will be deleted too. The same thing happens when you sign into the client's account without signing out of the administrator account.
When you sign in to the client's account, you are taken to the client's cabinet. But if you were redirected to the sign in page when you wanted to make a purchase, after signing in you are redirected to the checkout page.
