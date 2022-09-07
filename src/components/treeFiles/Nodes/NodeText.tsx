import React, {FC, useEffect, useRef} from 'react';
import Typography from "@mui/material/Typography";
import FormControl, {useFormControl} from '@mui/material/FormControl';
import {TreeInput} from "../styles";
import useRenameFile from "../../../hooks/CRUD/useRenameFile";

interface TextComponentProps {
  labelText: string,
  rename: boolean,
  onRename: (boolean: boolean) => void,
  isFolder?: boolean,
  id: string,
}

const NodeText: FC<TextComponentProps> = ({labelText, rename, onRename, isFolder, id}) => {
  const {} = useFormControl() || {};
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState(labelText);
  const renameFile = useRenameFile()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    onRename(false);
    renameFile(!!isFolder, id, name)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
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
    <>
      {
        rename ?
          <FormControl>
            <TreeInput
              inputRef={input}
              value={name}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
          :
          <Typography noWrap variant="body2" sx={{fontWeight: 'inherit', flexGrow: 1}}>
            {labelText}
          </Typography>
      }
    </>
  );
};

export default NodeText;