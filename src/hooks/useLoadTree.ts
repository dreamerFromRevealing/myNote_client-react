import {useQuery} from "@apollo/client";
import {GET_TREE} from "../queries/layout";

const useLoadTree = () => {
  const {loading, error, data} = useQuery(GET_TREE)

  return [loading]
}

export default useLoadTree