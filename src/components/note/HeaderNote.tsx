import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import LayoutViewSwitcher from "../layout/items/LayoutViewSwitcher";
import {Grid} from "@mui/material";

interface HeaderNoteProps {
  title?: string;
}

const HeaderNote: FC<HeaderNoteProps> = ({title}) => {
  return (
    <Grid display="flex" justifyContent="space-between" container sx={{p:1, pl: 5, borderBottom: '1px solid grey'}}>
      <Grid item sm={6} xs={12}>
        <Typography variant="h5" sx={{mb: 0}} gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid display="flex" justifyContent={{sm: 'flex-end', xs: 'flex-start'}} item sm={6} xs={12}>
        <LayoutViewSwitcher/>
      </Grid>
    </Grid>
  );
};

export default HeaderNote;