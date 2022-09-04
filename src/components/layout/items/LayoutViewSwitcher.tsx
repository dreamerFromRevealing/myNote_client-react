import React from 'react';
import {LayoutViewSwitcherBtn, LayoutViewSwitcherWrapper} from "../styles";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ImageIcon from '@mui/icons-material/Image';
import {useDispatch} from "react-redux";
import {setViewMode} from "../../../store/appSlice/appSlice";

const LayoutViewSwitcher = () => {
  const dispatch = useDispatch();

  const handleViewModeChange = (mode: string) => {
    dispatch(setViewMode(mode));
  };

  return (
    <LayoutViewSwitcherWrapper
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <LayoutViewSwitcherBtn
        size="small"
        variant="outlined"
        onClick={() => handleViewModeChange('only-text')}
      >
        <FormatAlignJustifyIcon/>
      </LayoutViewSwitcherBtn>
      <LayoutViewSwitcherBtn
        size="small"
        variant="outlined"
        onClick={() => handleViewModeChange('mix')}
      >
        <FormatAlignJustifyIcon/>
        <ImageIcon/>
      </LayoutViewSwitcherBtn>
      <LayoutViewSwitcherBtn
        size="small"
        variant="outlined"
        onClick={() => handleViewModeChange('only-image')}
      >
        <ImageIcon/>
      </LayoutViewSwitcherBtn>
    </LayoutViewSwitcherWrapper>
  );
};

export default LayoutViewSwitcher;