import { SyncLoader } from "react-spinners";

function Loader() {
  return (
    <div className="loader">
      <SyncLoader color="#f76f22" />
      Loading..
    </div>
  );
}

export default Loader;
