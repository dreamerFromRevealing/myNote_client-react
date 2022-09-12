import React, {FC} from 'react';
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import HexagonIcon from '@mui/icons-material/Hexagon';

interface IconComponentProps {
  type?: string
}

const NodeIcon: FC<IconComponentProps> = ({type}) => {
  return (
    <>
      {type === 'Folder' && <FolderIcon sx={{mr: 1, color: '#ff9800'}}/>}
      {type === 'Document' && <DescriptionIcon color="success" sx={{mr: 1}}/>}
      {type === 'Workspace' && <HexagonIcon sx={{mr: 1, color: '#3e6efc'}}/>}
    </>
  );
};

export default NodeIcon;