import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import TreeItem, {TreeItemProps} from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import {SvgIconProps} from '@mui/material/SvgIcon';
import IconComponent from "./IconComponent";

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelText: string;
  type?: string;
};

const StyledTreeItem: FC<StyledTreeItemProps> = (props) => {
  const {
    bgColor,
    color,
    labelText,
    type,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <IconComponent type={type}/>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

export default StyledTreeItem;