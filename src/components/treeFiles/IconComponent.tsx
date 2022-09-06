import React, {FC} from 'react';
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";

interface IconComponentProps {
  type?: string
}

const IconComponent: FC<IconComponentProps> = ({type}) => {
  return (
    <>
      {type === 'Folder' && <FolderIcon sx={{mr: 1, color: '#ff9800'}}/>}
      {type === 'Document' && <DescriptionIcon color="success" sx={{mr: 1}}/>}
    </>
  );
};

export default IconComponent;