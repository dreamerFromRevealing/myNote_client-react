import {useMutation} from "@apollo/client";
import {CREATE_NEW_DOCUMENT, CREATE_NEW_FOLDER} from "../../queries/treeFiles";
import {GET_TREE, GET_TREE_BY_WORKSPACE_ID} from "../../queries/layout";
import useAlert from "../useAlert";

const useCreateFile = (parentWorkspaceId?: string) => {
  const callAlert = useAlert();
  const [createDocument] = useMutation(CREATE_NEW_DOCUMENT, {
    refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: { parentWorkspaceId }
    }]
  });
  const [createFolder] = useMutation(CREATE_NEW_FOLDER, {
     refetchQueries: [{
      query: GET_TREE_BY_WORKSPACE_ID,
      variables: { parentWorkspaceId }
    }]
  });


  return async (parenId: string, title: string, typeFile?: string) => {

    try {
      if (typeFile === 'folder') await createFolder({variables: {parentFolderId: parenId, title, parentWorkspaceId}})
      else await createDocument({variables: {parentFolderId: parenId, title, typeFile, parentWorkspaceId}})

      callAlert( 'Файл успешно создан!', 'success');
    } catch (e) {
      console.log(e);
      callAlert( 'Ошибка создания файла!', 'error');
    }
  }
}

export default useCreateFile