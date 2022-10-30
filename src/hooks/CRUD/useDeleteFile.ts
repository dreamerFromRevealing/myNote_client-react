import useAlert from "../useAlert";
import {useMutation} from "@apollo/client";
import {CREATE_NEW_FOLDER, DELETE_DOCUMENT, DELETE_FOLDER, DELETE_TODO_BOX} from "../../queries/treeFiles";
import {GET_TREE, GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import {useEffect, useState} from "react";

const useDeleteFile = (type: string, parentWorkspaceId?: string): [Function, boolean, any] => {
  const callAlert = useAlert();
  const [mutation, setMutation] = useState<any>(DELETE_FOLDER);

  useEffect(() => {
    switch (type) {
      case 'Folder':
        setMutation(DELETE_FOLDER);
        break;
      case 'Document':
        setMutation(DELETE_DOCUMENT);
        break;
      case 'TodoBox':
        setMutation(DELETE_TODO_BOX);
        break;
    }
  }, [type])

  const [deleteHandler, {loading, data}] = useMutation(mutation, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: {parentWorkspaceId}
    }]
  });


  const deleteFile = async (id: string) => {
    try {
      await deleteHandler({variables: {_id: id}});
      callAlert('File deleted successfully', 'success');
    } catch (e) {
      console.log(e)
      callAlert('Error deleting file, please try again later!', 'error')
    }
  }

  return [deleteFile, loading, data]
}

export default useDeleteFile