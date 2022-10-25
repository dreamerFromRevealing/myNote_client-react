import {useMutation} from "@apollo/client";
import {CREATE_NEW_DOCUMENT, CREATE_NEW_FOLDER, CREATE_TODO_BOX} from "../../queries/treeFiles";
import {GET_TREE, GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import useAlert from "../useAlert";
import {useEffect, useState } from "react";

type dataType = {
  title: string,
  parentWorkspaceId?: string,
  parentFolderId?: string
}

const useCreateFile = (parentWorkspaceId?: string, type?: string) => {
  const callAlert = useAlert();
  const [mutation, setMutation] = useState<any>(CREATE_NEW_FOLDER);

  /**
   * Теперь надо будет тут все навсего добавлять установку нового запроса
   */
  useEffect(() => {
    switch (type) {
      case 'Folder':
        setMutation(CREATE_NEW_FOLDER);
        break;
      case 'Document':
        setMutation(CREATE_NEW_DOCUMENT);
        break;
      case 'TodoBox':
        setMutation(CREATE_TODO_BOX);
        break;
    }
  }, [type])

  const [createHandler] = useMutation(mutation, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: {parentWorkspaceId}
    }]
  });

  /**
   * Надо сдлеать более универсальной получения данных здесь
   */
  return async (payload: any, parentId?: string,) => {

    let data: dataType = {...payload}
    if (parentId) data.parentFolderId = parentId
    try {
      await createHandler({variables: {...data, parentWorkspaceId}});
      callAlert('Файл успешно создан!', 'success');
    } catch (e) {
      console.log(e);
      callAlert('Ошибка создания файла!', 'error');
    }
  }
}

export default useCreateFile