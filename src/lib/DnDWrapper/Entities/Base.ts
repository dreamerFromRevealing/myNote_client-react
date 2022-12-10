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
      } else if (index == destinationIndex) {
        return {
          ...item,
          position: +sourceIndex
        }
      }
      return {
        ...item,
        position: index
      }
    });
    return this.move(items, sourceIndex, destinationIndex);
  }

  protected move(arr: any[], oldIndex: number, newIndex: number) {
    if (newIndex >= arr.length) {
      let i = newIndex - arr.length + 1;
      while (i--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  protected baseMutationFunc(context: this, variablesName: string) {
    const variables = this.modifiedState.map((item: any) => {
      return {
        _id: item._id,
        position: item.position
      }
    })
    this.client.mutate({
      mutation: this.mutation,
      variables: {
        [variablesName]: {
          [variablesName]: variables
        }
      },
      optimisticResponse: {},
      update(cache,) {
        cache.writeQuery({
          query: context.query,
          variables: {[context.parentVariable]: context.resultDrop.source.droppableId},
          data: {
            [variablesName]: [...context.modifiedState]
          }
        })
      }
    })
  }
}

