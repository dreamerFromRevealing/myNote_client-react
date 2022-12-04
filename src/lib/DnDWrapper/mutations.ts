import {gql} from "@apollo/client";

export const MULTIPLE_DnD_UPDATE_TODO_COLLECTION = gql`
    mutation UpdatePositionTodoCollection($firstId: String!, $firstPosition: Float!, $secondId: String!, $secondPosition: Float!) {
        updatePositionTodoCollection(payload: {firstId: $firstId, firstPosition: $firstPosition, secondId: $secondId, secondPosition: $secondPosition})
    }
`