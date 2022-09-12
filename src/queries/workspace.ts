import {gql} from "@apollo/client";

export const GET_WORKSPACE = gql`
    query Workspace ($_id: String!) {
        workspace (_id: $_id) {
            _id
            title
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

export const CREATE_WORKSPACE = gql`
    mutation CreateWorkspace($title: String!) {
        createWorkspace(payload: {title: $title}) {
            _id
            title
        }
    }
`

export const UPDATE_WORKSPACE = gql`
    mutation UpdateWorkspace($_id: String!, $title: String!) {
        updateWorkspace(payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`

export const DELETE_WORKSPACE = gql`
    mutation DeleteWorkspace($_id: String!) {
        deleteWorkspace(_id: $_id) {
            _id
        }
    }
`