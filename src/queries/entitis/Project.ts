import {gql} from "@apollo/client";

export const CREATE_PROJECT = gql`
    mutation CreateProject($title: String!, $parentWorkspaceId: String!) {
        createProject(payload: {title: $title, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject($_id: String!) {
        deleteProject(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($_id: String!, $title: String, $parentWorkspaceId: String) {
        updateProject(payload: {_id: $_id, title: $title, parentWorkspaceId: $parentWorkspaceId}) {
            _id
        }
    }
`

export const GET_PROJECT = gql`
    query Project ($_id: String!){
        project (_id: $_id) {
            _id
            title
            parentWorkspaceId {
                _id
            }
        }
    }
`


export const GET_PROJECTS = gql`
    query Projects ($parentWorkspaceId: String!){
        projects (filters: {parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`
