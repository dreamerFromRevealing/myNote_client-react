import React from 'react';
import {useSelector} from "react-redux";
import EditModal from "../editModal/EditModal";
import CreateModal from "../createModal/CreateModal";


const BodyModal = () => {
  const state = useSelector((state: any) => state.modal);
    switch (state.modalType) {
      case 'edit':
        return <EditModal id={state.modalProps.id} isFolder={state.modalProps.isFolder}/>
      case 'create':
        return <CreateModal parentId={state.modalProps.id}/>
      default:
        return null;
    }
};

export default BodyModal;