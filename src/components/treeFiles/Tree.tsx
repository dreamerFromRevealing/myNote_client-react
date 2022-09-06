import React, {FC} from 'react';
import {DATAType} from "../../types/types_data_from_server/dataType";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Branch from "./Branch";

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export interface TreeProps {
  data: DATAType[] | DATAType
}

const Tree: FC<TreeProps> = ({data}) => {

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon/>}
      // sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <Branch data={data}/>
    </TreeView>
  );
};

export default Tree;