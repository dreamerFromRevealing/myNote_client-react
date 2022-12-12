import React, {useEffect} from 'react';
import LayoutNodeMenu from "../LayoutNodeMenu";
import {MenuItem} from "@mui/material";
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";
import {useLazyQuery, useMutation} from "@apollo/client";
import {CREATE_LOGBOOK_FOLDER, GET_TODO_LOGBOOK_FOLDER_BY_TITLE} from "../../../../../queries/entitis/LogbookFolder";
import {CREATE_LOGBOOK_NOTE} from "../../../../../queries/entitis/LogbookNote";
import dayjs from "dayjs"

type logbookFolderType = {
  title: string,
  _id: string,
  __typename: string
}

//TODO После создания запиис надо реализовать получени записей по папке журнала
const LogbookNodeMenu = ({close, handleEdit, handleDelete, id}: ItemsNodeMenuProps) => {
  const [findLogbookFolder] = useLazyQuery(GET_TODO_LOGBOOK_FOLDER_BY_TITLE)
  const [createLogbookFolder] = useMutation(CREATE_LOGBOOK_FOLDER)
  const [createLogbookNote] = useMutation(CREATE_LOGBOOK_NOTE)

  const createNote = async () => {
    const currentDate = new Date()

    const logbookFolderName = generateLogbookFolderName(currentDate)
    const logbookNoteName = `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`

    let {data: logbookFolder}: any = await findLogbookFolder({
      variables: {
        title: logbookFolderName,
        parentLogbookId: id
      }
    })

    if (!logbookFolder){
      const {data: logbookFolderFromMutation}: any = await createLogbookFolder({
        variables: {
          title: logbookFolderName,
          parentLogbookId: id
        }
      })
      logbookFolder = logbookFolderFromMutation
    }

      await createLogbookNote({
        variables: {
          title: logbookNoteName,
          parentLogbookFolderId: logbookFolder._id
        }
      })
  }


  const generateLogbookFolderName = (currentDate: Date) => {
    const month = dayjs(currentDate).format('MMMM')
    const year = currentDate.getFullYear().toString()
    return `${month}_${year.slice(-2)}`
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