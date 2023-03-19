import {gql} from "@apollo/client";

export const UPDATE_DOCUMENT_TITLE = gql`
    mutation UpdateDocument ($_id: String!, $title: String){
        updateDocument (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`
export const CREATE_NEW_DOCUMENT = gql`
    mutation CreateDocument ($parentFolderId: String, $title: String!, $parentProjectId: String!){
        createDocument (payload: {parentFolderId: $parentFolderId, title: $title, parentProjectId: $parentProjectId}) {
            _id
            title
        }
    }
`
export const DELETE_DOCUMENT = gql`
    mutation DeleteDocument ($_id: String!){
        deleteDocument (_id: $_id) {
            _id
        }
    }
`

export const GET_DOCUMENT = gql`
    query Document ($_id: String!){
        document (_id: $_id) {
            _id
            title
            content
            parentProjectId {
                _id
            }
        }
    }
`

export const UPDATE_DOCUMENT = gql`
    mutation UpdateDocument ($_id: String!, $content: String, $title: String){
        updateDocument (payload: {_id: $_id, content: $content, title: $title}) {
            _id
            title
            content
        }
    }
`
