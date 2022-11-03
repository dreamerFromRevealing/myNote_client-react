import {useMutation} from "@apollo/client";
import {CREATE_NEW_DOCUMENT, CREATE_NEW_FOLDER, CREATE_TODO_BOARD, CREATE_TODO_BOX} from "../../queries/treeFiles";
import {GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import useAlert from "../useAlert";
import {useEffect, useState} from "react";

const useCreateFile = (parentWorkspaceId?: string, type?: string, mutation?: any): [Function, boolean] => {
  const callAlert = useAlert();
  // const [mutation, setMutation] = useState<any>();

  /**
   * Теперь надо будет тут все навсего добавлять установку нового запроса
   */
  // useEffect(() => {
  //   switch (type) {
  //     case 'Folder':
  //       setMutation(CREATE_NEW_FOLDER);
  //       break;
  //     case 'Document':
  //       setMutation(CREATE_NEW_DOCUMENT);
  //       break;
  //     case 'TodoBox':
  //       setMutation(CREATE_TODO_BOX);
  //       break;
  //     case 'TodoBoard':
  //       setMutation(CREATE_TODO_BOARD)
  //   }
  // }, [])

  const [createHandler, {loading}] = useMutation(mutation, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: {parentWorkspaceId}
    }]
  });

  /**
   * Надо сдлеать более универсальной получения данных здесь
   */
  const createFile = async (payload: any, parentId?: string,) => {

    let data: any = {...payload}
    // if (parentId) data.parentFolderId = parentId
    try {
      await createHandler({variables: {...data, parentWorkspaceId}});
      callAlert('Файл успешно создан!', 'success');
    } catch (e) {
      console.log(e);
      callAlert('Ошибка создания файла!', 'error');
    }
  }


  return [createFile, loading]
}

export default useCreateFile