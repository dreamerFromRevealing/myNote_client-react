import {useMutation} from "@apollo/client";
import {CREATE_NEW_DOCUMENT, CREATE_NEW_FOLDER} from "../../queries/treeFiles";
import {GET_TREE} from "../../queries/layout";
import useAlert from "../useAlert";

const useCreateFile = () => {
  const callAlert = useAlert();
  const [createDocument] = useMutation(CREATE_NEW_DOCUMENT, {
    refetchQueries: [GET_TREE]
  });
  const [createFolder] = useMutation(CREATE_NEW_FOLDER, {
    refetchQueries: [GET_TREE]
  });


  return async (parenId: string, title: string, typeFile?: string) => {
    try {
      if (typeFile === 'folder') await createFolder({variables: {parentFolderId: parenId, title}})
      else await createDocument({variables: {parentFolderId: parenId, title, typeFile}})

      callAlert( 'Файл успешно создан!', 'success');
    } catch (e) {
      console.log(e);
      callAlert( 'Ошибка создания файла!', 'error');
    }
  }
}

export default useCreateFile