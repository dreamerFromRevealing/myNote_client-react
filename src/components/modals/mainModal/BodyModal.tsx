import React from 'react';
import {useSelector} from "react-redux";
import EditFileModal from "../editModals/editFileModal/EditFileModal";
import CreateFileModal from "../createModals/createFileModal/CreateFileModal";
import WorkspaceEditModal from "../editModals/workspaceEditModal/WorkspaceEditModal";
import WorkspaceCreateModal from "../createModals/workspaceCreateModal/WorkspaceCreateModal";
import TodoCreateModal from "../createModals/todoCreateModal/TodoCreateModal";
import TodoEditModal from "../editModals/todoEditModal/TodoEditModal";
import DeleteModal from "../deleteModal/DeleteModal";


const BodyModal = () => {
  const state = useSelector((state: any) => state.modal);

  switch (state.modalType) {
    //Edit modals=====================================================================================================
    case 'edit':
      switch (state.subtype) {
        case 'Folder':
        case 'Document':
          return <EditFileModal id={state.modalProps.id} type={state.modalProps.type}/>
        case 'Workspace':
          return <WorkspaceEditModal id={state.modalProps.id}/>
        case 'TodoBox':
          return <TodoEditModal id={state.modalProps.id}/>
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
          return <TodoCreateModal titleBoard={state.modalProps.title}/>
        default:
          return null;
      }
    //--------------------------------------------------------------------------------------------------------
    //Create modals===================================================================================================
    case 'delete':
      return <DeleteModal
        id={state.modalProps.id}
        type={state.modalProps.type}
        parentWorkspaceId={state.modalProps.parentWorkspaceId}
        name={state.modalProps.name}
      />
    //--------------------------------------------------------------------------------------------------------
    default:
      return null;
  }
};

export default BodyModal;