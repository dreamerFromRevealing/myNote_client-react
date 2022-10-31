import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";

interface TextComponentProps {
  labelText: string,
}

const NodeText: FC<TextComponentProps> = ({labelText}) => (
  <Tooltip title={labelText || ''} enterDelay={1500} arrow>
    <Typography noWrap variant="body2" sx={{fontWeight: 'inherit', flexGrow: 1}}>
      {labelText}
    </Typography>
  </Tooltip>
  );

export default NodeText;