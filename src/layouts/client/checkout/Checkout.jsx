import OrderDetails from "./OrderDetails";
import HorizontalLinearStepper from "../checkout/HorizontalLinearStepper";
import { useTheme } from "../../../hooks/customHooks";
import { useSelector } from "react-redux";
import emptyIcon from "../../../assets/icons/empty-box-icon.png";

function Checkout() {
  const { dark } = useTheme();
  const cart = useSelector((state) => state.cart);

  return (
    <div
      className={`w-full flex gap-5 max-[650px]:p-2 max-[900px]:p-4 max-[1240px]:flex-col p-8
      ${dark && "bg-zinc-800"}`}
    >
      {cart.length ? (
        <>
          <OrderDetails />
          <HorizontalLinearStepper />
        </>
      ) : (
        <div className="w-full h-80 flex flex-col justify-center items-center gap-5">
          <img src={emptyIcon} alt="Empty" className="h-1/3" />
          <span className={`mont text-xl ${dark && "text-zinc-300"}`}>
            You have no orders.
          </span>
        </div>
      )}
    </div>
  );
}

export default Checkout;
