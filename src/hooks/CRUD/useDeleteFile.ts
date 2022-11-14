import useAlert from "../useAlert";
import {useMutation} from "@apollo/client";
import {DELETE_DOCUMENT, DELETE_FOLDER, DELETE_TODO_BOX, DELETE_TODO_COLLECTION} from "../../queries/treeFiles";
import {GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import {useEffect, useState} from "react";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";

const useDeleteFile = (type: string, parentId?: string): [Function, boolean, any] => {
  const callAlert = useAlert();
  const [mutation, setMutation] = useState<any>(DELETE_FOLDER);
  const [refetch, setRefetch] = useState<any>({
    refetchQuery: GET_TREE_BY_WORKSPACE_ID,
    refetchVariables: {parentWorkspaceId: parentId}
  })

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
      case 'TodoCollection':
        setMutation(DELETE_TODO_COLLECTION)
        setRefetch({
          refetchQuery: GET_TODO_COLLECTIONS,
          refetchVariables: {parentTodoBoardParentId: parentId}
        })
    }
  }, [type])

  const [deleteHandler, {loading, data}] = useMutation(mutation, {
    refetchQueries: [{
      query: refetch.refetchQuery,
      variables: {...refetch.refetchVariables}
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