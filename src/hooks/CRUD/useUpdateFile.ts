import {useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import useHandleReqAlert from "../useHandleReqAlert";
import {GET_FOLDER, UPDATE_FOLDER} from "../../queries/entitis/Folder";
import {GET_DOCUMENT, UPDATE_DOCUMENT} from "../../queries/entitis/Document";
import {GET_TODO_BOX, UPDATE_TODO_BOX} from "../../queries/entitis/TodoBox";
import {GET_LOGBOOK, UPDATE_LOGBOOK} from "../../queries/entitis/Logbook";
import {GET_PROJECT, UPDATE_PROJECT} from "../../queries/entitis/Project";
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
        break;
      case 'Project':
        setQuery({
          query: GET_PROJECT,
          mutation: UPDATE_PROJECT
        })
        break;
      case 'Logbook':
        setQuery({
          query: GET_LOGBOOK,
          mutation: UPDATE_LOGBOOK
        })
        break;
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