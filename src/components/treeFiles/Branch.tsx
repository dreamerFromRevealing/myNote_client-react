import React, {FC} from 'react';
import {TreeProps} from "./Tree";
import StyledTreeItem from "./StyledTreeItem";
import NodeNewComponent from "./Nodes/NodeNewComponent";
import {useSelector} from "react-redux";

/**
 * Как бы нам просунуть эту картинку
 * @param data
 * @constructor
 */
const Branch: FC<TreeProps>  = ({data}) => {
  const createComponent = useSelector((state: any) => state.app.createComponent);

  if (Array.isArray(data)) {
    return (
      <StyledTreeItem type={'Folder'} nodeId={'root'} labelText={'Parent'}>
        {createComponent && <NodeNewComponent type={'Folder'}  parenId={'root'}/>}
        {Array.isArray(data)
          ? data.map((node: any) => <Branch key={node._id} data={node}/>)
          : null}
      </StyledTreeItem>
    )
  }

  return (
    <StyledTreeItem type={data.__typename} nodeId={data._id} labelText={data.title || ''}>
      {createComponent && <NodeNewComponent type={createComponent}  parenId={data._id}/>}
      {Array.isArray(data.children)
        ? data.children.map((node: any) => <Branch key={node._id} data={node}/>)
        : null}
    </StyledTreeItem>
  )
};

export default Branch;