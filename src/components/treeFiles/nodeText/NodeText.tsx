import React, {FC, useEffect, useRef} from 'react';
import {NodeTextWrap} from "../styles";
import {Tooltip} from "@mui/material";
import useRenameFile from "../../../hooks/CRUD/useRenameFile";

interface NodeTextProps {
  title: string,
  rename: boolean,
  onRename: (boolean: boolean) => void,
  isFolder: boolean,
  id: string,
}

const NodeText: FC<NodeTextProps> = ({title, rename, onRename, isFolder, id}) => {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState(title);
  const renameFile = useRenameFile()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    onRename(false);
    renameFile(isFolder, id, name)
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
        {
          rename ? <input
              ref={input}
              type="text"
              value={name}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            :
            <>{name}</>
        }
      </NodeTextWrap>
    </Tooltip>
  );
};

export default NodeText;