import React from 'react';
import {useSelector} from "react-redux";
import EditFileModal from "../editModals/editFileModal/EditFileModal";
import CreateFileModal from "../createModals/createFileModal/CreateFileModal";
import WorkspaceEditModal from "../editModals/workspaceEditModal/WorkspaceEditModal";
import WorkspaceCreateModal from "../createModals/workspaceCreateModal/WorkspaceCreateModal";
import TodoCreateModal from "../createModals/todoCreateModal/TodoCreateModal";
import TodoEditModal from "../editModals/todoEditModal/TodoEditModal";


const BodyModal = () => {
  const state = useSelector((state: any) => state.modal);

    switch (state.modalType) {
      //Edit modals=====================================================================================================
      case 'edit':
        switch (state.subtype) {
          case 'file':
            return <EditFileModal id={state.modalProps.id} type={state.modalProps.type}/>
          case 'workspace':
            return <WorkspaceEditModal id={state.modalProps.id}/>
          case 'todo':
            return <TodoEditModal id={state.modalProps.id}/>
          default:
            return null;
        }
      //--------------------------------------------------------------------------------------------------------
      //Create modals===================================================================================================
      case 'create':
        switch (state.subtype) {
          case 'file':
            return <CreateFileModal parentWorkspaceId={state.modalProps.parentWorkspaceId} parentId={state.modalProps.id}/>
          case 'workspace':
            return <WorkspaceCreateModal/>
          case 'todo':
            return <TodoCreateModal titleBoard={state.modalProps.title}/>
          default:
            return null;
        }
      //--------------------------------------------------------------------------------------------------------
      default:
        return null;
    }
};

export default BodyModal;