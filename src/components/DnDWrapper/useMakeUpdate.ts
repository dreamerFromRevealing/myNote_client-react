import {useMutation} from "@apollo/client";
import {useRef} from "react";
import {MULTIPLE_DnD_UPDATE_TODO_COLLECTION} from "./Reducers/TODOCollectionReducer/mutation";

/**
 * Хук для применения перемещения элемнтов
 */
const useMakeUpdate = () => {
  const query = useRef(MULTIPLE_DnD_UPDATE_TODO_COLLECTION)
  const [updateCollection] = useMutation(query.current);


  return async (
    newArray: any,
    type: string,
    prevIndex: number,
    newIndex: number,
    parentId: string,
    queryState: any,
  ) => {
    query.current = queryState.mutation
    await updateCollection({
      variables: {
        firstId: newArray[newIndex]._id,
        firstPosition: newArray[newIndex].position,
        secondId: newArray[prevIndex]._id,
        secondPosition: newArray[prevIndex].position
      },
      optimisticResponse: {},
      update(cache,) {
        cache.writeQuery({
          query: queryState.query,
          variables: {[queryState.parentVariable]: parentId},
          data: {
            [type]: [...newArray]
          }
        })
      }
    })
  }
}

export default useMakeUpdate