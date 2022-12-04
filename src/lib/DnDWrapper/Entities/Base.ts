import {ApolloClient, DocumentNode} from "@apollo/client";
import {DropResult} from "react-beautiful-dnd";
import {DnDDefaultProps} from "../DnDWrapper";

export interface BasePropsInterface {
  query: DocumentNode
  mutation: DocumentNode
  parentVariable: string
}

export default abstract class Base {
  protected client: ApolloClient<any>;
  protected query: DocumentNode
  protected mutation: DocumentNode
  protected parentVariable: string
  protected resultDrop: DropResult
  protected currentState: any;
  protected modifiedState: any;

  protected constructor(props: DnDDefaultProps) {
    this.client = props.client;
    this.query = props.entityProps.query;
    this.mutation = props.entityProps.mutation;
    this.parentVariable = props.entityProps.parentVariable;
    this.resultDrop = props.resultDrop;
  }


  abstract getCurrentState(): any;
  abstract modifyState(): any;
  abstract updateState(): any;

  protected parsePosition(arr: any, sourceIndex: number, destinationIndex: number): any {
    const items: any = arr.map((item: any, index: number) => {
      if (index == sourceIndex) {
        return {
          ...item,
          position: +destinationIndex
        }
      }
      if (index == destinationIndex) {
        return {
          ...item,
          position: +sourceIndex
        }
      }
      return item
    });

    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    return items;
  }
}