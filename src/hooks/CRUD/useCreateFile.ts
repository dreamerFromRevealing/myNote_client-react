import {useMutation} from "@apollo/client";
import {CREATE_NEW_DOCUMENT, CREATE_NEW_FOLDER} from "../../components/treeFiles/queries";
import {GET_TREE} from "../../components/layout/queries";
import useAlert from "../useAlert";

const useCreateFile = () => {
  const callAlert = useAlert();
  const [createDocument] = useMutation(CREATE_NEW_DOCUMENT, {
    refetchQueries: [GET_TREE]
  });
  const [createFolder] = useMutation(CREATE_NEW_FOLDER, {
    refetchQueries: [GET_TREE]
  });


  return async (type: string, parenId: string, name: string) => {
    try {
      if (type === 'document') await createDocument({variables: {parentFolderId: parenId, title: name}})
      if (type === 'folder') await createFolder({variables: {parentFolderId: parenId, title: name}})
      callAlert( 'File created successfully!', 'success');
    } catch (e) {
      console.log(e);
      callAlert( 'File creation error, please try again later!', 'error');
    }
  }
}

export default useCreateFile