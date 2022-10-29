import React, {FC, useEffect} from 'react';
import {TreeProps} from "../Tree";
import StyledTreeItem from "../StyledTreeItem";
import {useSelector} from "react-redux";

interface BranchProps extends TreeProps {
  openWhenCreateNewNode?: (id: string) => void;
}

const Branch: FC<BranchProps> = ({data, openWhenCreateNewNode}) => {
  const createComponent = useSelector((state: any) => state.app.createComponent);

  useEffect(() => {
    if (createComponent && openWhenCreateNewNode) {
      openWhenCreateNewNode(createComponent.parenId)
    }
  }, [createComponent])

  if (Array.isArray(data)) {
    return (
      <>
        {Array.isArray(data)
          ? data.map((node: any) => <Branch key={node._id} data={node}/>)
          : null}
      </>
    )
  }

  switch (data.__typename) {
    case 'Folder':
      return (
        <StyledTreeItem parentWorkspaceId={data?.parentWorkspaceId?._id} type={data.__typename} nodeId={data._id}
                        labelText={data.title || ''}>
          {(Array.isArray(data.children) && data.children.length > 0) && data.children.map((node: any) => (
            <Branch key={node._id} data={node}/>))}
        </StyledTreeItem>
      )
    case 'TodoBox':
      return (
        <StyledTreeItem parentWorkspaceId={data?.parentWorkspaceId?._id} type={data.__typename} nodeId={data._id}
                        labelText={data.title || ''}>
          {(Array.isArray(data.childTodoBoardIds) && data.childTodoBoardIds.length > 0) && data.childTodoBoardIds.map((node: any) => (
            <Branch key={node._id} data={node}/>))}
        </StyledTreeItem>
      )
    default:
      return (
        <StyledTreeItem parentWorkspaceId={data?.parentWorkspaceId?._id} type={data.__typename}
                        nodeId={data._id} labelText={data.title || ''}/>
      )
  }
};

export default Branch;