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
            parentFolderId {
                _id
            }
            parentWorkspaceId {
                _id
            }
        }
        
        todoBoxes(filters: {parentWorkspaceId: $parentWorkspaceId}){
            _id
            title
            childTodoBoardIds {
                _id
                title
                childrenTodoCollectionIds {
                    _id
                    title
                    color
                    childrenTodoTaskIds {
                        _id
                        title
                        description
                    }
                }
            }
            parentFolderId {
                _id
            }
        }
    }
`

