import Base, {BasePropsInterface} from "./Base";
import {ApolloClient} from "@apollo/client";
import {DocumentNode} from "graphql/language";
import {DropResult} from "react-beautiful-dnd";
import {DnDDefaultProps} from "../DnDWrapper";

export default class TodoCollection extends Base {
  constructor(props: DnDDefaultProps) {
    super(props);
  }

  getCurrentState(): any {
    this.currentState = this.client.readQuery({
      query: this.query,
      variables: {[this.parentVariable]: this.resultDrop.source.droppableId}
    })
  }

  modifyState(): any {
    if (this.resultDrop.destination) {
      this.modifiedState = this.parsePosition(this.currentState.todoCollections, this.resultDrop.source.index, this.resultDrop.destination.index)
    }
  }

  updateState(): any {
   const context = this

    if (this.resultDrop.destination) {
      this.client.mutate({
        mutation: this.mutation,
        variables: {
          firstId: this.modifiedState[this.resultDrop.destination.index]._id,
          firstPosition: this.modifiedState[this.resultDrop.destination.index].position,
          secondId: this.modifiedState[this.resultDrop.source.index]._id,
          secondPosition: this.modifiedState[this.resultDrop.source.index].position
        },
        optimisticResponse: {},
        update(cache,) {
          cache.writeQuery({
            query: context.query,
            variables: {[context.parentVariable]: context.resultDrop.source.droppableId},
            data: {
              todoCollections: [...context.modifiedState]
            }
          })
        }
      })
    }
  }

}