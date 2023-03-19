import React, {useEffect} from 'react';
import LayoutNodeMenu from "../LayoutNodeMenu";
import {MenuItem} from "@mui/material";
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";
import {useLazyQuery, useMutation} from "@apollo/client";
import {CREATE_LOGBOOK_FOLDER, GET_TODO_LOGBOOK_FOLDER_BY_TITLE} from "../../../../../queries/entitis/LogbookFolder";
import {CREATE_LOG} from "../../../../../queries/entitis/Log";
import dayjs from "dayjs"
import {GET_TODO_COLLECTIONS} from "../../../../../queries/entitis/TodoCollection";
import {GET_TREE_BY_PROJECT_ID} from "../../../../../queries/layout";

type logbookFolderType = {
  title: string,
  _id: string,
  __typename: string
}

//TODO После создания запиис надо реализовать получени записей по папке журнала
const LogbookNodeMenu = ({close, handleEdit, handleDelete, id, parentProjectId}: ItemsNodeMenuProps) => {
  const [findLogbookFolder] = useLazyQuery(GET_TODO_LOGBOOK_FOLDER_BY_TITLE)
  const [createLogbookFolder] = useMutation(CREATE_LOGBOOK_FOLDER)
  const [createLog] = useMutation(CREATE_LOG, {
    refetchQueries: [{
      query: GET_TREE_BY_PROJECT_ID,
      variables: {parentProjectId}
    }]
  })

  const createNote = async () => {
    const currentDate = new Date()

    const logbookFolderName = dayjs(currentDate).format('MMMM_YY')
    const logbookNoteName = dayjs(currentDate).format('DD.MM.YYYY')

    let {data: logbookFolder}: any = await findLogbookFolder({
      variables: {
        title: logbookFolderName,
        parentLogbookId: id
      },
      fetchPolicy: 'network-only'
    })

    if (logbookFolder?.logbookFolders.length === 0){
      const {data: logbookFolderFromMutation}: any = await createLogbookFolder({
        variables: {
          title: logbookFolderName,
          parentLogbookId: id,
          parentProjectId
        }
      })
      logbookFolder = logbookFolderFromMutation.createLogbookFolder
    } else {
      logbookFolder = logbookFolder?.logbookFolders[0]
    }

      await createLog({
        variables: {
          title: logbookNoteName,
          parentLogbookFolderId: logbookFolder._id,
          parentProjectId
        }
      })
  }
  return (
    <LayoutNodeMenu close={close}>
      <MenuItem onClick={createNote}>Создать запись</MenuItem>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>
  );
};

export default LogbookNodeMenu;