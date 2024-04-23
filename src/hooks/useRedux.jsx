import { useDispatch, useSelector } from "react-redux";

function useRedux() {
  const dispatch = useDispatch();

  return <div>useRedux</div>;
}

export default useRedux;
