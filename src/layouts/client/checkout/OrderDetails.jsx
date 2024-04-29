import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStorage, useTheme } from "../../../hooks/customHooks";
import {
  decreaseProductCountRED,
  increaseProductCountRED,
} from "../../../redux/client/cartSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AddIcon,
  RemoveIcon,
} from "/src/styles/mui";
import deleteIcon from "../../../assets/icons/close-mini-icon.png";


function OrderDetails() {
  const cart = useSelector((state) => state.cart);
  if (cart.length) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  const { handleLocalStorageData } = useStorage();
  const { dark } = useTheme();
  const dispatch = useDispatch();

  function getTotalPrice() {
    let totalPrice = 0;

    cart.forEach((product) => {
      let count = product.productCount;
      let price =
        product.salePrice > 0 ? product.salePrice : product.productPrice;

      totalPrice += count * price;
    });

    return totalPrice;
  }

  const removeProductFromOrderList = async (e, product) => {
    await handleLocalStorageData(e, "cart", product);
  };

  const decreaseCount = (product) => {
    dispatch(decreaseProductCountRED(product._id));
  };

  const increaseCount = (product) => {
    dispatch(increaseProductCountRED(product._id));
  };

  return (
    <div className="orderDetails max-[650px]:p-2 p-4 max-[1240px]:w-full max-[1240px]:border-b w-4/12 min-[1240px]:border-r border-zinc-300 ">
      <h1
        className={`w-full max-[650px]:text-left max-[650px]:text-xl text-2xl text-center mb-4
      ${dark && "text-zinc-300"}`}
      >
        Order Details
      </h1>

      <TableContainer className="relative">
        <Table>
          <TableHead>
            <TableRow className="tableRow">
              <TableCell className="tableCell firstCell">
                <span className={`mont ${dark && "text-zinc-300"}`}>
                  Product
                </span>
              </TableCell>
              <TableCell className="tableCell countCell">
                <span className={`mont ${dark && "text-zinc-300"}`}>Count</span>
              </TableCell>
              <TableCell className="tableCell priceCell">
                <span className={`mont ${dark && "text-zinc-300"}`}>Price</span>
              </TableCell>
              <TableCell className="tableCell imgCell"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((product) => (
              <TableRow key={product._id} className="tableRow">
                <TableCell className="tableCell firstCell">
                  <h2
                    className={`m-1 font-medium max-[1240px]:text-lg max-[650px]:text-sm mont
                          ${dark && "text-zinc-300"}`}
                  >
                    {product.brand}
                    <span
                      className={`max-[650px]:hidden ${
                        dark && "text-zinc-300"
                      }`}
                    >
                      |
                    </span>
                    <br className="min-[650px]:hidden" />
                    {product.title}
                  </h2>
                  <div className="flex">
                    <img
                      className="max-[1240px]:h-28 h-20 mr-1.5"
                      src={product.images[0].url}
                      alt="Product image"
                    />
                    <img
                      className="max-[1240px]:h-28 max-[650px]:hidden h-20"
                      src={product.images[1].url}
                      alt="Product image"
                    />
                  </div>
                </TableCell>
                <TableCell className="tableCell countCell">
                  <button onClick={() => decreaseCount(product)}>
                    <RemoveIcon />
                  </button>
                  <span className="max-[1240px]:text-2xl max-[650px]:text-lg text-base">
                    {product.productCount}
                  </span>
                  <button onClick={() => increaseCount(product)}>
                    <AddIcon />
                  </button>
                </TableCell>
                <TableCell className="tableCell priceCell">
                  <span className="max-[1240px]:text-2xl max-[650px]:text-lg text-base mont">
                    {product.salePrice > 0
                      ? product.salePrice * product.productCount
                      : product.productPrice * product.productCount}
                    $
                  </span>
                </TableCell>
                <TableCell className="tableCell imgCell">
                  <img
                    src={deleteIcon}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => removeProductFromOrderList(e, product)}
                    alt="Delete"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="max-[1240px]:py-14 max-[650px]:py-8 max-[650px]:p-6 w-full flex justify-between p-6 px-20 text-xl">
        <span className="max-[1240px]:text-3xl max-[650px]:text-xl mont">
          Total Price
        </span>
        <span className="max-[1240px]:text-3xl max-[650px]:text-xl mont">
          {getTotalPrice()}$
        </span>
      </div>
    </div>
  );
}

export default OrderDetails;
