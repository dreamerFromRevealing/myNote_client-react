import React, {FC, useEffect, useRef, useState} from 'react';
import useCreateFile from "../../../hooks/CRUD/useCreateFile";
import Box from "@mui/material/Box";
import NodeIcon from "./NodeIcon";
import TreeItem from "@mui/lab/TreeItem";
import {useDispatch, useSelector} from "react-redux";
import {setCreateComponent} from "../../../store/appSlice/appSlice";
import FormControl from "@mui/material/FormControl";
import {TreeInput} from "../styles";

interface NodeNewComponentProps {
  parenId: string;
}

const NodeNewComponent: FC<NodeNewComponentProps> = ({ parenId,  ...other}) => {
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
      createFile(createComponent.type, parenId, name)
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
            <NodeIcon type={createComponent.type}/>
            <FormControl>
              <TreeInput
                inputRef={input}
                value={name}
                onBlur={onSubmit}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
          </Box>
        }
        {...other}
      />
  );
};

export default NodeNewComponent;