import * as React from 'react';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../../store/modalSlice/modalSlice";
import BodyModal from "./BodyModal";
import {ModalContent, ModalWrapper} from './styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import Backdrop from '@mui/material/Backdrop';

const MainModal = () => {
  const isOpen = useSelector((state: any) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <Modal
        open={!!isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <ModalWrapper>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <CloseIcon sx={{cursor: 'pointer'}}  onClick={handleClose}/>
          </Box>
          <ModalContent>
            <BodyModal/>
          </ModalContent>
        </ModalWrapper>
      </Modal>
    </div>
  );
}

export default MainModal;
