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

export const GET_TREE_BY_WORKSPACE_ID = gql`
    query FoldersDocuments($parentWorkspaceId: String!){
        folders(filters: {parentWorkspaceId: $parentWorkspaceId}){
            _id
            title
            parentWorkspaceId {
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

        documents(filters: {parentWorkspaceId: $parentWorkspaceId}){
            _id
            title
            parentFolderId
            typeFile
            parentWorkspaceId {
                _id
            }
        }
    }
`

export const GET_WORKSPACES = gql`
    query Workspaces  {
        workspaces {
            _id,
            title
        }
    }
`