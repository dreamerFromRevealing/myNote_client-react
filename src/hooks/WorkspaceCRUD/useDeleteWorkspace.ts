import useHandleReqAlert from "../useHandleReqAlert";
import {useMutation} from "@apollo/client";
import {DELETE_WORKSPACE, GET_WORKSPACES} from "../../queries/workspace";

const useDeleteWorkspace = () => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert();
  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE, {
    refetchQueries: [{query: GET_WORKSPACES}]
  });

  return async (id: string) => {
    try {
      await deleteWorkspace({variables: {_id: id}});
      callSuccessAlert('Workspace deleted successfully');
    } catch (e) {
      console.log(e)
      callErrorAlert('Error deleting workspace, please try again later!');
    }
  }
}

export default useDeleteWorkspace