import React, {FC} from 'react';
import Typography from "@mui/material/Typography";

interface TextComponentProps {
  labelText: string,
}

const NodeText: FC<TextComponentProps> = ({labelText}) => (
    <Typography noWrap variant="body2" sx={{fontWeight: 'inherit', flexGrow: 1}}>
      {labelText}
    </Typography>
  );

export default NodeText;