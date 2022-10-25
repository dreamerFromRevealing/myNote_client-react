import {useMutation} from "@apollo/client";
import {UPDATE_DOCUMENT_TITLE} from "../../queries/treeFiles";
import useAlert from "../useAlert";
import {UPDATE_FOLDER} from "../../queries/queries";
import {useEffect, useState} from "react";

const useUpdateFile = (type: string) => {
  const [mutation, setMutation] = useState<any>(null);
  const [updateHandler] = useMutation(mutation);
  const callAlert = useAlert();

  useEffect(() => {
    switch (type) {
      case 'Folder':
        setMutation(UPDATE_FOLDER);
        break;
      case 'Document':
        setMutation(UPDATE_DOCUMENT_TITLE);
        break;

    }
  }, [])

  return async (payload: any) => {
    try {
      await updateHandler({variables: payload})
      callAlert('File name edited!', 'success');
    } catch (e) {
      console.log(e);
      callAlert('Error renaming file, please try again later!', 'error');
    }
  }
}

export default useUpdateFile