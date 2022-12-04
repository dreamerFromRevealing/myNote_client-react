import {Component} from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import { ReactElement } from "react-markdown/lib/react-markdown";
import {ApolloClient} from "@apollo/client";
import Base from "./Entities/Base";
import TodoCollection from "./Entities/TodoCollection";
import {DnDConfig, DnDConfigItemType} from "./DnDConfig";

interface DnDWrapperProps {
  children: ReactElement;
  client: ApolloClient<any>;
}

export type DnDDefaultProps = {
  client: ApolloClient<any>;
  resultDrop: DropResult;
  entityProps: DnDConfigItemType;
}

export class DnDWrapper extends Component<DnDWrapperProps> {
  onDragEnd = (result: DropResult) => {

    const defaultProps: DnDDefaultProps = {
      client: this.props.client,
      resultDrop: result,
      entityProps: DnDConfig[result.type],
    }
   //И тут в зависимости от типа должна происходить инициализация того или ного типа
    let initEntity: Base | null = null;
    switch (result.type) {
      case "todoCollections":
        initEntity = new TodoCollection(defaultProps);
    }

    if (initEntity) {
      initEntity.getCurrentState()
      initEntity.modifyState()
      initEntity.updateState()
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.props.children}
      </DragDropContext>
    );
  }
}