import React from 'react';
import {useSelector} from "react-redux";
import EditModal from "../editModal/EditModal";
import CreateModal from "../createModal/CreateModal";
import WorkspaceEditModal from "../workspaceEditModal/WorkspaceEditModal";
import WorkspaceCreateModal from "../workspaceCreateModal/WorkspaceCreateModal";


const BodyModal = () => {
  const state = useSelector((state: any) => state.modal);
    switch (state.modalType) {
      case 'edit':
        return <EditModal id={state.modalProps.id} isFolder={state.modalProps.isFolder}/>
      case 'create':
        return <CreateModal parentWorkspaceId={state.modalProps.parentWorkspaceId} parentId={state.modalProps.id}/>
      case 'edit-workspace':
        return <WorkspaceEditModal id={state.modalProps.id}/>
      case 'create-workspace':
        return <WorkspaceCreateModal/>
      default:
        return null;
    }
};

export default BodyModal;