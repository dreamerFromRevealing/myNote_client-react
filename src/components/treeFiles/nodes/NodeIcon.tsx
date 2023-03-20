import React, {FC} from 'react';
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import HexagonIcon from '@mui/icons-material/Hexagon';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TopicIcon from '@mui/icons-material/Topic';
import InventoryIcon from '@mui/icons-material/Inventory';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
interface IconComponentProps {
  type?: string
}

const NodeIcon: FC<IconComponentProps> = ({type}) => {
  return (
    <>
      {type === 'Folder' && <FolderIcon sx={{mr: 1, color: '#ff9800'}}/>}
      {type === 'Document' && <DescriptionIcon color="success" sx={{mr: 1}}/>}
      {type === 'TodoBoard' && <ListAltIcon color="success" sx={{mr: 1, color: '#60226f'}}/>}
      {type === 'TodoBox' && <AllInboxIcon sx={{mr: 1, color: '#097749'}}/>}
      {type === 'Workspace' && <HexagonIcon sx={{mr: 1, color: '#3e6efc'}}/>}
      {type === 'Project' && <DesignServicesIcon sx={{mr: 1, color: '#a8840a'}}/>}
      {type === 'Logbook' && <TopicIcon sx={{mr: 1, color: '#69d9a1'}}/>}
      {type === 'LogbookFolder' && <InventoryIcon sx={{mr: 1, color: '#6b4848'}}/>}
      {type === 'Log' && <StickyNote2Icon sx={{mr: 1, color: '#659a24'}}/>}
    </>
  );
};

export default NodeIcon;