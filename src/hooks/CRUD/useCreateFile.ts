import {useMutation} from "@apollo/client";
import {GET_TREE_BY_PROJECT_ID} from "../../queries/layout";
import useAlert from "../useAlert";
import {DocumentNode} from "graphql/language";

const useCreateFile = (mutation: DocumentNode, parentProjectId: string): [Function, boolean] => {
  const callAlert = useAlert();

  const [createHandler, {loading}] = useMutation(mutation, {
    refetchQueries: [{
      query: GET_TREE_BY_PROJECT_ID,
      variables: {parentProjectId}
    }]
  });

  /**
   * Надо сдлеать более универсальной получения данных здесь
   */
  const createFile = async (payload: any) => {
    let data: any = {...payload}

    try {
      await createHandler({variables: {...data}});
      callAlert('Файл успешно создан!', 'success');
    } catch (e) {
      console.log(e);
      callAlert('Ошибка создания файла!', 'error');
    }
  }


  return [createFile, loading]
}

export default useCreateFile