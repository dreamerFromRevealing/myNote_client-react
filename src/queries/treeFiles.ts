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
    mutation CreateDocument ($parentFolderId: String!, $title: String!, $typeFile: String!, $parentWorkspaceId: String!){
        createDocument (payload: {parentFolderId: $parentFolderId, title: $title, typeFile: $typeFile, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
            typeFile
        }
    }
`

export const CREATE_NEW_FOLDER = gql`
    mutation createFolder ($parentFolderId: String!, $title: String!, $parentWorkspaceId: String!){
        createFolder (payload: {parentFolderId: $parentFolderId, title: $title, parentWorkspaceId: $parentWorkspaceId}) {
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