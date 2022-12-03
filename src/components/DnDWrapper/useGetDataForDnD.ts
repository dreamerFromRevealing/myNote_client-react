import {useRef} from "react";
import {useLazyQuery} from "@apollo/client";
import DnDConfig from "./DnDConfig";

const useGetDataForDnD = () => {
  let queryState = useRef({...DnDConfig.todoCollections})

  const [getDataCurrent] = useLazyQuery(queryState.current.query, {fetchPolicy: 'cache-only'})


  return async (type: string, parentId: string) => {
  switch (type) {
    case 'todoCollections':
      queryState.current = DnDConfig.todoCollections
      break
    case 'todoTasks':
      queryState.current = DnDConfig.todoTasks
      break
  }

  const {data} = await getDataCurrent({
    variables: {[queryState.current.parentVariable]: parentId}
  })

    console.log('useGetDataForDnD', data, {[queryState.current.parentVariable]: parentId})
  return [data[type], queryState.current]
}
}

export default useGetDataForDnD