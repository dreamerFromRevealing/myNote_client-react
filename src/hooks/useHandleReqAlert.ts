import useAlert from "./useAlert";

const useHandleReqAlert = () => {
  const callAlert = useAlert();

  const callSuccessAlert = (message: string) => {
    callAlert(message, "success");
  }

  const callErrorAlert = (message: string, err?: any) => {
    callAlert(message, "error");
    console.error(err)
  }

  return {callSuccessAlert, callErrorAlert};
}

export default useHandleReqAlert;