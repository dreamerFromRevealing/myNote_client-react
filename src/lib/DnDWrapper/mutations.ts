import {gql} from "@apollo/client";

export const MULTIPLE_DnD_UPDATE_TODO_COLLECTION = gql`
    mutation UpdatePositionTodoCollection($arrCollections: UpdatePositionArrTodoCollectionsInput!) {
        updatePositionTodoCollection(payload: $arrCollections) {
            _id
            position
            parentTodoBoardParentId {
                _id
            }
        }
    }
`