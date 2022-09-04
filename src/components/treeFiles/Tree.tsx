import React, {FC} from 'react';
import Branch from "./Branch";
import {DATAType} from "../../types/types_data_from_server/dataType";
import {List} from "@mui/material";

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

interface TreeProps {
  data: DATAType[]
}

const Tree: FC<TreeProps> = ({data}) => {

  return (
    <div>
      {data.map((item: DATAType) =>
        <List sx={style} key={item._id} component="div" aria-label="mailbox folders">
          <Branch key={item._id} item={item} level={0}/>
        </List>
      )}
    </div>
  );
};

export default Tree;