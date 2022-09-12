import React, {FC} from 'react';
import List from "@mui/material/List";
import WorkspaceItem from "./WorkspaceItem";

interface WorkspaceProps {
  workspaces: [{ _id: string, title: string, __typename: string }]
}

const Workspace: FC<WorkspaceProps> = ({workspaces}) => {
  return (
    <List>
      {workspaces && workspaces.map(workspace => (
        <WorkspaceItem key={workspace._id} workspace={workspace}/>
      ))}
    </List>
  );
};

export default Workspace;