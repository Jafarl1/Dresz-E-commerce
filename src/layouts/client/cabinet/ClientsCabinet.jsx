import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

function ClientsCabinet() {
  const loadingRed = useSelector((state) => state.loading);

  return loadingRed ? <Loader /> : <div>ClientsCabinet</div>;
}

export default ClientsCabinet;
