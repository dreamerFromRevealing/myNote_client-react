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
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const openWhenCreateNewNode = (id: string) => {
    setExpanded([...expanded, id])
  }

  return (
    <TreeView
      expanded={expanded}
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon/>}
      onNodeToggle={handleToggle}
      // sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <Branch openWhenCreateNewNode={openWhenCreateNewNode} data={data}/>
    </TreeView>
  );
};

export default Tree;