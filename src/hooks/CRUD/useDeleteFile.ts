import useAlert from "../useAlert";
import {useMutation} from "@apollo/client";
import {DELETE_DOCUMENT, DELETE_FOLDER} from "../../queries/treeFiles";
import {GET_TREE, GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";

const useDeleteFile = (parentWorkspaceId?: string) => {
  const callAlert = useAlert();
  const [deleteDocument] = useMutation(DELETE_DOCUMENT, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: { parentWorkspaceId }
    }]
  });
  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: { parentWorkspaceId }
    }]
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