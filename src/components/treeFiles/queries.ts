import {gql} from "@apollo/client";

export const UPDATE_DOCUMENT_TITLE = gql`
    mutation UpdateDocument ($_id: String!, $title: String){
        updateDocument (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`

export const UPDATE_FOLDER_TITLE = gql`
    mutation UpdateFolder ($_id: String!, $title: String){
        updateFolder (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`

export const CREATE_NEW_DOCUMENT = gql`
    mutation CreateDocument ($parentFolderId: String!, $title: String!){
        createDocument (payload: {parentFolderId: $parentFolderId, title: $title}) {
            _id
            title
        }
    }
`

export const CREATE_NEW_FOLDER = gql`
    mutation createFolder ($parentFolderId: String!, $title: String!){
        createFolder (payload: {parentFolderId: $parentFolderId, title: $title}) {
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

export const DELETE_FOLDER = gql`
    mutation DeleteFolder ($_id: String!){
        deleteFolder (_id: $_id) {
            _id
        }
    }
`