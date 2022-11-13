import React from 'react';
import TODOCollection from "./TODOCollection";
import {useMutation} from "@apollo/client";
import {DELETE_TODO_COLLECTION} from "../../queries/treeFiles";
import {GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import useHandleReqAlert from "../../hooks/useHandleReqAlert";

export interface TodoCollectionFuncProps {
  title: string;
  color: string;
  id?: string;
  parentTodoBoardParentId?: string;
}


const TodoCollectionFunc = ({title, color, id, parentTodoBoardParentId}: TodoCollectionFuncProps) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [deleteCollection] = useMutation(DELETE_TODO_COLLECTION,
    {
      refetchQueries: [{
        query: GET_TODO_COLLECTIONS,
        variables: {parentTodoBoardParentId}
      }]
    }
  )

  const handleDelete = () => {
    deleteCollection({variables: {_id: id}})
      .then(() => callSuccessAlert('TODO коллекция успешно удалена!'))
      .catch(err => callErrorAlert('Ошибка удаления TODO коллекции', err))
  }

  return (
    <TODOCollection
      title={title}
      color={color}
      handleDelete={handleDelete}
    />
  );
};

export default TodoCollectionFunc;