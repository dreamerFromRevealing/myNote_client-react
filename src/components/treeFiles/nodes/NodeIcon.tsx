import React, {FC} from 'react';
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import HexagonIcon from '@mui/icons-material/Hexagon';
import ListAltIcon from '@mui/icons-material/ListAlt';

interface IconComponentProps {
  type?: string
  typeFile?: string
}

const NodeIcon: FC<IconComponentProps> = ({type, typeFile}) => {
  return (
    <>
      {type === 'Folder' && <FolderIcon sx={{mr: 1, color: '#ff9800'}}/>}
      {type === 'Document' && (
        <>
          {typeFile === 'default' && <DescriptionIcon color="success" sx={{mr: 1}}/>}
          {typeFile === 'todo' && <ListAltIcon color="success" sx={{mr: 1, color: '#60226f'}}/>}
        </>
      )}
      {type === 'Workspace' && <HexagonIcon sx={{mr: 1, color: '#3e6efc'}}/>}
    </>
  );
};

export default NodeIcon;