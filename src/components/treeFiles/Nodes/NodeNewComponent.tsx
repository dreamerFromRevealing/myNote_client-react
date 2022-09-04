import React, {FC, useEffect, useRef, useState} from 'react';
import {NodeRow, NodeTextWrap} from "../styles";
import {AiOutlineFile, AiOutlineFolder} from "react-icons/ai";
import useCreateFile from "../../../hooks/CRUD/useCreateFile";

interface NodeNewComponentProps {
  setCreateComponent: (string: string) => void;
  createComponent: string;
  parenId: string;
}

const NodeNewComponent: FC<NodeNewComponentProps> = ({setCreateComponent, createComponent, parenId}) => {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const createFile = useCreateFile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    if (name.length > 0) {
      createFile(createComponent, parenId, name)
    }
    setCreateComponent('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [])

  return (
    <NodeRow>
      {createComponent === 'folder' ? <AiOutlineFolder size={24}/> : <AiOutlineFile size={24}/>}
      <NodeTextWrap>
        <input
          ref={input}
          type="text"
          value={name}
          onBlur={onSubmit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </NodeTextWrap>
    </NodeRow>
  );
};

export default NodeNewComponent;