import {gql} from "@apollo/client";

export const GET_DOCUMENT = gql`
    query Document ($_id: String!){
        document (_id: $_id) {
            _id
            title
            content
        }
    }
`

export const UPDATE_DOCUMENT = gql`
    mutation UpdateDocument ($_id: String!, $content: String){
        updateDocument (payload: {_id: $_id, content: $content}) {
            _id
            title
            content
        }
    }
`