import {gql} from "@apollo/client";

export const GET_DOCUMENT = gql`
    query Document ($_id: String!){
        document (_id: $_id) {
            _id
            title
            content
            typeFile
        }
    }
`

export const GET_FOLDER = gql`
    query Folder ($_id: String!){
        folder (_id: $_id) {
            _id
            title
            pathname
        }
    }
`

export const UPDATE_DOCUMENT = gql`
    mutation UpdateDocument ($_id: String!, $content: String, $title: String, $typeFile: String){
        updateDocument (payload: {_id: $_id, content: $content, title: $title, typeFile: $typeFile}) {
            _id
            title
            content
            typeFile
        }
    }
`

export const UPDATE_FOLDER = gql`
    mutation UpdateFolder ($_id: String!, $title: String){
        updateFolder (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`