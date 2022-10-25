import React, {FC, useEffect, useRef} from 'react';
import {NodeTextWrap} from "../styles";
import {Tooltip} from "@mui/material";
import useUpdateFile from "../../../hooks/CRUD/useUpdateFile";

interface NodeTextProps {
  title: string,
  rename: boolean,
  onRename: (boolean: boolean) => void,
  id: string,
}

const NodeText: FC<NodeTextProps> = ({title, rename, onRename, id}) => {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState(title);
  const renameFile = useUpdateFile('Document')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    onRename(false);
    renameFile({id, title: name})
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  useEffect(() => {
    if (rename && input.current) {
      input.current.focus();
    }
  }, [rename])

  return (
    <Tooltip title={title || ''} enterDelay={1500} arrow>
      <NodeTextWrap>
        {name}
      </NodeTextWrap>
    </Tooltip>
  );
};

export default NodeText;