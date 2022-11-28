import React from 'react';
import {useSelector} from "react-redux";
import EditFileModal from "../editModals/editFileModal/EditFileModal";
import CreateFileModal from "../createModals/createFileModal/CreateFileModal";
import WorkspaceEditModal from "../editModals/workspaceEditModal/WorkspaceEditModal";
import WorkspaceCreateModal from "../createModals/workspaceCreateModal/WorkspaceCreateModal";
import DeleteModal from "../deleteModal/DeleteModal";
import TodoBoardCreateModal from "../createModals/todoCreateModal/TodoBoardCreateModal";
import CreateTodoCollectionModal from "../createModals/createTODOCollectionModal/CreateTODOCollectionModal";
import TodoCollectionEditModal from "../editModals/todoCollectionEditModal/TodoCollectionEditModal";
import CreateTodoTaskModal from "../createModals/createTODOTaskModal/CreateTODOTaskModal";
import EditTODOTaskModal from "../editModals/editTODOTaskModal/EditTODOTaskModal";

const BodyModal = () => {
  const state = useSelector((state: any) => state.modal);

  switch (state.modalType) {
    //Edit modals=====================================================================================================
    case 'edit':
      switch (state.subtype) {
        case 'TodoBox':
        case 'Folder':
        case 'Document':
          return <EditFileModal parentWorkspaceId={state.modalProps.parentWorkspaceId} id={state.modalProps.id} type={state.modalProps.type}/>
        case 'Workspace':
          return <WorkspaceEditModal id={state.modalProps.id}/>
        case 'TodoCollection':
          return <TodoCollectionEditModal
            id={state.modalProps.id}
            parentId={state.modalProps.parentId}
            title={state.modalProps.name}
            color={state.modalProps.color}/>
        case 'TodoTask':
          return <EditTODOTaskModal parentTodoCollectionId={state.modalProps.parentTodoCollectionId} id={state.modalProps.id}/>
        default:
          return null;
      }
    //--------------------------------------------------------------------------------------------------------
    //Create modals===================================================================================================
    case 'create':
      switch (state.subtype) {
        case 'Folder':
          return <CreateFileModal parentWorkspaceId={state.modalProps.parentWorkspaceId}
                                  parentId={state.modalProps.id}/>
        case 'Workspace':
          return <WorkspaceCreateModal/>
        case 'TodoBox':
          return  <TodoBoardCreateModal parentWorkspaceId={state.modalProps.parentWorkspaceId}
                                        parentId={state.modalProps.id}/>
        case 'TodoCollection':
          return <CreateTodoCollectionModal
            parentTodoBoardParentId={state.modalProps.parentTodoBoardParentId}
            countItems={state.modalProps.countItems}
          />
        case 'TodoTask':
          return <CreateTodoTaskModal parentTodoCollectionId={state.modalProps.parentTodoCollectionId} countItems={state.modalProps.countItems}/>
        default:
          return null;
      }
    //--------------------------------------------------------------------------------------------------------
    //Create modals===================================================================================================
    case 'delete':
      return <DeleteModal
        id={state.modalProps.id}
        type={state.modalProps.type}
        parentId={state.modalProps.parentId}
        name={state.modalProps.name}
      />
    //--------------------------------------------------------------------------------------------------------
    default:
      return null;
  }
};

export default BodyModal;