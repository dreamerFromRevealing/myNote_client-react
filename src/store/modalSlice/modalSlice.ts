import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: '',
    subtype: '',
    modalProps: {},
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.subtype = action.payload.subtype
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = '';
      state.subtype = '';
      state.modalProps = {};
    },
  },
});

export default modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;