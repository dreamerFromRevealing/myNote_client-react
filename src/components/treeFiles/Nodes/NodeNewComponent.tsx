import React, {FC, useEffect, useRef, useState} from 'react';
import useCreateFile from "../../../hooks/CRUD/useCreateFile";
import Box from "@mui/material/Box";
import IconComponent from "../IconComponent";
import TreeItem from "@mui/lab/TreeItem";
import {useDispatch, useSelector} from "react-redux";
import {setCreateComponent} from "../../../store/appSlice/appSlice";

interface NodeNewComponentProps {
  parenId: string;
  type: string;
}

const NodeNewComponent: FC<NodeNewComponentProps> = ({ parenId, type, ...other}) => {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const createFile = useCreateFile()
  const createComponent = useSelector((state: any) => state.app.createComponent);
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    if (name.length > 0) {
      createFile(createComponent, parenId, name)
    }
    dispatch(setCreateComponent(''))
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
      <TreeItem
        nodeId={'new'}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            <IconComponent type={type}/>
            <input
              ref={input}
              type="text"
              value={name}
              onBlur={onSubmit}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Box>
        }
        {...other}
      />
  );
};

export default NodeNewComponent;