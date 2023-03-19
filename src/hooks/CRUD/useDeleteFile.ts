import useAlert from "../useAlert";
import {useMutation} from "@apollo/client";
import {GET_TREE_BY_PROJECT_ID} from "../../queries/layout";
import {useEffect, useState} from "react";
import {DELETE_TODO_COLLECTION, GET_TODO_COLLECTIONS} from "../../queries/entitis/TodoCollection";
import {DELETE_TODO_TASK, GET_TODO_TASKS} from "../../queries/entitis/TodoTask";
import {DELETE_TODO_BOX} from "../../queries/entitis/TodoBox";
import {DELETE_FOLDER} from "../../queries/entitis/Folder";
import {DELETE_PROJECT} from "../../queries/entitis/Project";
import {DELETE_DOCUMENT} from "../../queries/entitis/Document";
import {DELETE_TODO_BOARD} from "../../queries/entitis/TodoBoard";
import {DELETE_LOGBOOK} from "../../queries/entitis/Logbook";
import {DELETE_LOGBOOK_FOLDER} from "../../queries/entitis/LogbookFolder";
import {DELETE_LOG} from "../../queries/entitis/Log";

const useDeleteFile = (type: string, parentId?: string): [Function, boolean, any] => {
  const callAlert = useAlert();
  const [mutation, setMutation] = useState<any>(DELETE_FOLDER);
  const [refetch, setRefetch] = useState<any>({
    refetchQuery: GET_TREE_BY_PROJECT_ID,
    refetchVariables: {parentProjectId: parentId}
  });

  useEffect(() => {
    switch (type) {
      case "Folder":
        setMutation(DELETE_FOLDER);
        break;
      case "Document":
        setMutation(DELETE_DOCUMENT);
        break;
      case "TodoBox":
        setMutation(DELETE_TODO_BOX);
        break;
      case "TodoCollection":
        setMutation(DELETE_TODO_COLLECTION);
        setRefetch({
          refetchQuery: GET_TODO_COLLECTIONS,
          refetchVariables: {parentTodoBoardParentId: parentId}
        });
        break;
      case "TodoBoard":
        setMutation(DELETE_TODO_BOARD);
        break;
      case "TodoTask":
        setMutation(DELETE_TODO_TASK);
        setRefetch({
          refetchQuery: GET_TODO_TASKS,
          refetchVariables: {parentTodoCollectionId: parentId}
        });
        break;
      case "Project":
        setMutation(DELETE_PROJECT);
        break;
      case "Logbook":
        setMutation(DELETE_LOGBOOK);
        break;
      case "LogbookFolder":
        setMutation(DELETE_LOGBOOK_FOLDER);
        break;
      case "Log":
        setMutation(DELETE_LOG);
    }
  }, [type, parentId]);

  const [deleteHandler, {loading, data}] = useMutation(mutation, {
    refetchQueries: [{
      query: refetch.refetchQuery,
      variables: {...refetch.refetchVariables}
    }]
  });


  const deleteFile = async (id: string) => {
    try {
      await deleteHandler({variables: {_id: id}});
      callAlert("File deleted successfully", "success");
    } catch (e) {
      console.log(e);
      callAlert("Error deleting file, please try again later!", "error");
    }
  };

  return [deleteFile, loading, data];
};

export default useDeleteFile;