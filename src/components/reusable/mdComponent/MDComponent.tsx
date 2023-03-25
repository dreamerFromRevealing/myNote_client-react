import React, {useEffect, useRef, useState} from "react";
import {ICommand} from "@uiw/react-md-editor/src/commands";
import MDEditor, {commands} from "@uiw/react-md-editor";
import Preloader from "../../layout/items/Preloader";
import {MdEditorWrapper} from "../../log/styles";

type MDComponentProps = {
  data: string,
  loading: boolean,
  saveCallback: (text: string) => void
}

export const MDComponent = ({data, loading, saveCallback}: MDComponentProps) => {
  const [value, setValue] = useState<any>(``);
  const commandsList = useRef<ICommand[]>([]);

  useEffect(() => {
    if (!!data) setValue(data);
  }, [data]);

  useEffect(() => {
    if (commandsList.current.length !== 0) return

    const saveBtn: ICommand = {
      name: "save",
      keyCommand: "save",
      shortcuts: "ctrlcmd+g",
      value: "save",
      buttonProps: {"aria-label": "Save (ctrl + g)", title: "Save (ctrl + g)"},
      icon: <div style={{fontSize: 18, textAlign: "left"}}>s</div>,
      execute: async ({text}) => saveCallback(text),
    };

    commandsList.current = [...commands.getCommands(), saveBtn];
  }, []);


  if (loading || commandsList.current.length === 0) return <Preloader/>;
  return (
    <MdEditorWrapper>
      <MDEditor
        commands={commandsList.current}
        highlightEnable
        value={value}
        onChange={setValue}
      />
    </MdEditorWrapper>

  );
};