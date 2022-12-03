import {useEffect, useState} from "react";
import _ from "lodash";
import {useQuery} from "@apollo/client";
import {DocumentNode, TypedDocumentNode} from "@apollo/client/core";

const sortItemByPosition = (item: any) => item.sort((a: any, b: any) => {
  return a.position - b.position
})

/**
 * Получает и сортирует элементы по позиции
 *
 * @param query - запрос GraphQL
 * @param variables - переменные для запроса
 * @param itemName - название элемента который надо получить из data возращаемого useQuery
 */

const useFormatPositionElement = (query: DocumentNode | TypedDocumentNode, variables: any, itemName: string) => {
  const [arrState, setArrState] = useState<any>([])
  const {data, loading} = useQuery(query, {
    variables
  })
  // console.log('useFormatPositionElement', data)
  useEffect(() => {
    if (!!data) {
      const copyTodoCollections = _.cloneDeep(data[itemName]);
      const sortArray = sortItemByPosition(copyTodoCollections)
      setArrState(sortArray)
    }
  }, [data])

  return [arrState, setArrState, loading]
}

export default useFormatPositionElement