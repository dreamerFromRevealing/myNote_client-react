import {gql} from "@apollo/client";

export const GET_DOCUMENT = gql`
    query Document ($_id: String!){
        document (_id: $_id) {
            _id
            title
            content
            parentWorkspaceId {
                _id
            }
        }
    }
`

export const GET_FOLDER = gql`
    query Folder ($_id: String!){
        folder (_id: $_id) {
            _id
            title
            pathname
            parentWorkspaceId {
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

export const UPDATE_FOLDER = gql`
    mutation UpdateFolder ($_id: String!, $title: String){
        updateFolder (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`

export const GET_TODO_BOX = gql`
      query TodoBox ($_id: String!){
        todoBox (_id: $_id) {
       _id
        title
        parentWorkspaceId {
          _id
        }
        parentFolderId {
          _id
        }
        childTodoBoardIds {
          _id
        }
      }
    }
  `

export const GET_TODO_COLLECTIONS = gql`
  query TodoCollections($parentTodoBoardParentId: String) {
  todoCollections(filters: {parentTodoBoardParentId: $parentTodoBoardParentId}){
    _id
    title
    color
    position
    childrenTodoTaskIds {
      _id
    }
  }
}
`