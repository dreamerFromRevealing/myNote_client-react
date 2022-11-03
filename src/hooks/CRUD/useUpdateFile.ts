import {useEffect, useState} from "react";
import {GET_DOCUMENT, GET_FOLDER, GET_TODO_BOX, UPDATE_DOCUMENT, UPDATE_FOLDER} from "../../queries/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import useHandleReqAlert from "../useHandleReqAlert";
import {UPDATE_TODO_BOX} from "../../queries/treeFiles";

const useUpdateFile = (id: string, type: string, parentWorkspaceId: string): [Function, boolean, any] => {
//Это значения по умолчанию
  const [query, setQuery] = useState<any>({
    query: GET_FOLDER,
    mutation: UPDATE_FOLDER
  });

  const [loadData, {data: currentData}] = useLazyQuery(query.query, {variables: {_id: id}})

  // А это они меняються если приходит другой тип
  useEffect(() => {
    switch (type) {
      case 'Document':
        setQuery({
          query: GET_DOCUMENT,
          mutation: UPDATE_DOCUMENT
        })
        break;
        case 'TodoBox':
          setQuery({
            query: GET_TODO_BOX,
            mutation: UPDATE_TODO_BOX
          })
    }

    loadData()
  }, [])

  const [updateFile, {loading}] = useMutation(query.mutation,
    {
      refetchQueries: [{
        query: GET_TREE_BY_WORKSPACE_ID,
        variables: { parentWorkspaceId }
      }]
    });
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()

  const handleUpdate = async (payload: any) => {
    try {
      await updateFile({
        variables: {
          _id: id,
          ...payload
        }
      })
      callSuccessAlert('Изменения сохранены')
    } catch (e) {
      callErrorAlert('Ошибка при сохранении')
      console.error(e)
    }
  }

  return [handleUpdate, loading, currentData]
}

export default useUpdateFile