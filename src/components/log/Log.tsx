import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import Preloader from "../layout/items/Preloader";
import React, {useEffect, useState} from "react";
import {GET_LOG, UPDATE_LOG} from "../../queries/entitis/Log";
import MDEditor, {commands,} from "@uiw/react-md-editor";
import {MdEditorWrapper} from "./styles";
import {ICommand} from "@uiw/react-md-editor/src/commands";

export const Log = () => {
  const {logId} = useParams();
  const [updateLog] = useMutation(UPDATE_LOG);
  const [commandsList, setCommandsList] = useState<any>();
  const [value, setValue] = useState<any>(``);
  const {data, loading} = useQuery(GET_LOG, {
    variables: {_id: logId}
  });

  useEffect(() => {
    if (!!data?.log) setValue(data?.log.content)
  }, [data])

  useEffect(() => {
    const saveBtn: ICommand = {
      name: 'save',
      keyCommand: 'save',
      shortcuts: 'ctrlcmd+s',
      value: 'save',
      buttonProps: { 'aria-label': 'Save (ctrl + s)', title: 'Save (ctrl + s)' },
      icon: <div style={{ fontSize: 18, textAlign: 'left' }}>s</div>,
      execute: async (state) => {

        await updateLog({
          variables: {
            _id: logId,
            content: state.text
          }
        })
      },
    }

    setCommandsList([...commands.getCommands(), saveBtn])


  }, [])

  if (loading) return <Preloader/>;
  return (
    <MdEditorWrapper>
      <MDEditor
        commands={commandsList}
        highlightEnable
        value={value}
        onChange={setValue}
      />
    </MdEditorWrapper>

  );
};