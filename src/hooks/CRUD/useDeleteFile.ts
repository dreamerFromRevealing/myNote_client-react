import useAlert from "../useAlert";
import {useMutation} from "@apollo/client";
import {DELETE_DOCUMENT, DELETE_FOLDER} from "../../components/treeFiles/queries";
import {GET_TREE} from "../../components/layout/queries";

const useDeleteFile = () => {
  const callAlert = useAlert();
  const [deleteDocument] = useMutation(DELETE_DOCUMENT, {
    refetchQueries: [GET_TREE]
  });
  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [GET_TREE]
  });

  return async (isFolder: boolean, id: string) => {
    try {
      if (isFolder) await deleteFolder({variables: {_id: id}});
      else await deleteDocument({variables: {_id: id}});
      callAlert( 'File deleted successfully', 'success');
    } catch (e) {
      console.log(e)
      callAlert( 'Error deleting file, please try again later!', 'error')
    }
  }
}

export default useDeleteFile