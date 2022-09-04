import {useDispatch} from "react-redux";
import {setAlert} from "../store/appSlice/appSlice";

const useAlert = () => {
  const dispatch = useDispatch();

  return (message: string, type: string) => {
    dispatch(setAlert({
      show: true,
      message: message,
      type: type,
    }))
  }
}

export default useAlert;