import useAlert from "./useAlert";

const useHandleReqAlert = () => {
  const callAlert = useAlert();

  const callSuccessAlert = (message: string) => {
    callAlert(message, "success");
  }

  const callErrorAlert = (message: string) => {
    callAlert(message, "error");
  }

  return {callSuccessAlert, callErrorAlert};
}

export default useHandleReqAlert;