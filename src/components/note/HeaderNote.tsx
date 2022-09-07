import Box from '@mui/material/Box/Box';
import React, {FC} from 'react';
import Typography from "@mui/material/Typography";

interface HeaderNoteProps {
  title?: string;
}

const HeaderNote: FC<HeaderNoteProps> = ({title}) => {
  return (
    <Box sx={{pl: 5, borderBottom: '1px solid grey'}}>
      <Typography variant="h5" sx={{mb: 0}} gutterBottom>
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderNote;