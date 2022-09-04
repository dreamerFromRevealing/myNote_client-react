import {useMutation} from "@apollo/client";
import {UPDATE_DOCUMENT_TITLE, UPDATE_FOLDER_TITLE} from "../../components/treeFiles/queries";
import useAlert from "../useAlert";

const useRenameFile = () => {
  const [updateDocumentTitle] = useMutation(UPDATE_DOCUMENT_TITLE);
  const [updateFolderTitle] = useMutation(UPDATE_FOLDER_TITLE);
  const callAlert = useAlert();

  return async (isFolder: boolean, id: string, name: string) => {
    try {
      if (isFolder) await updateFolderTitle({variables: {_id: id, title: name}})
      if (!isFolder) await updateDocumentTitle({variables: {_id: id, title: name}})
      callAlert( 'File name edited!', 'success');
    } catch (e) {
      console.log(e);
      callAlert( 'Error renaming file, please try again later!', 'error');
    }
  }
}

export default useRenameFile