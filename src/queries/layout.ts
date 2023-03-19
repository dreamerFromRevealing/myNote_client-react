import {gql} from "@apollo/client";

export const GET_TREE = gql`
    query FoldersDocuments{
        folders{
            _id
            title
            parentFolderId {
                _id
            }
            childFoldersIds{
                _id
            }
            childDocsIds{
                _id
            }
        }

        documents {
            _id
            title
            parentFolderId
        }
    }
`


export const GET_TREE_BY_PROJECT_ID = gql`
    query FoldersDocuments($parentProjectId: String!){
        folders(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
            parentFolderId {
                _id
            }
            childFoldersIds{
                _id
            }
            childDocsIds{
                _id
            }

        }

        documents(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentFolderId {
                _id
            }
            parentProjectId {
                _id
            }
        }

        logbooks(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
        }

        logbookFolders(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
            parentLogbookId {
                _id
            }
        }

        logs (filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
            parentLogbookFolderId {
                _id
            }
        }

        todoBoxes(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
            parentFolderId {
                _id
            }
        }

        todoBoards(filters: {parentProjectId: $parentProjectId}){
            _id
            title
            parentProjectId {
                _id
            }
            parentTodoBoxId {
                _id
            }
        }
    }
`


export const GET_PROJECTS_ID = gql`
    query Projects ($parentWorkspaceId: String!) {
        projects(filters: {parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`
