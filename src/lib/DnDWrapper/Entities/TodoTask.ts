import {DnDDefaultProps} from "../DnDWrapper";
import Base from "./Base";

/**
 * Давай сначала отработаем перемещения внутри одной колекции
 */
export class TodoTask extends Base {
  constructor(props: DnDDefaultProps) {
    super(props);
  }

  getCurrentState(): any {
    if (!!this.resultDrop?.destination) {
      if (this.resultDrop.source.droppableId === this.resultDrop.destination?.droppableId) {
        this.currentState = this.client.readQuery({
          query: this.query,
          variables: {[this.parentVariable]: this.resultDrop.source.droppableId}
        })
      } else {
        this.currentState = {
          sourceCollection: this.client.readQuery({
            query: this.query,
            variables: {[this.parentVariable]: this.resultDrop.source.droppableId}
          }).todoTasks,
          destinationCollection: this.client.readQuery({
            query: this.query,
            variables: {[this.parentVariable]: this.resultDrop.destination?.droppableId}
          }).todoTasks
        }
      }
    }
  }

  modifyState(): any {
    if (!!this.resultDrop?.destination) {
      if (this.resultDrop.source.droppableId === this.resultDrop.destination?.droppableId) {
        this.modifiedState = this.parsePosition(this.currentState.todoTasks, this.resultDrop.source.index, this.resultDrop.destination.index)
      } else {
        const moveElement = {
          ...this.currentState.sourceCollection[this.resultDrop.source.index],
          position: this.resultDrop.destination.index,
          parentTodoCollectionId: this.resultDrop.destination?.droppableId
        }
        const copySourceCollection = [...this.currentState.sourceCollection]
        const copyDestinationCollection = [...this.currentState.destinationCollection]

        copySourceCollection.splice(this.resultDrop.source.index, 1)
        copyDestinationCollection.splice(this.resultDrop.destination.index, 0, moveElement)

        this.modifiedState = {
          sourceCollection: copySourceCollection,
          destinationCollection: copyDestinationCollection
        }

      }
    }
  }

  updateState(): any {
    if (!!this.resultDrop?.destination) {
      const context = this
      if (this.resultDrop.source.droppableId === this.resultDrop.destination?.droppableId) {
        this.baseMutationFunc(context, 'todoTasks')
      } else {
        this.mutationForMoveInNewCollection(context)
      }
    }

  }

  mutationForMoveInNewCollection(context: this) {
    const firstCollectionVariable = this.modifiedState.sourceCollection.map((item: any) => {
      return {
        _id: item._id,
        position: item.position
      }
    })

    const secondCollectionVariable = this.modifiedState.destinationCollection.map((item: any, index: number) => {
      if (index === context.resultDrop.destination?.index) {
        return {
          _id: item._id,
          position: item.position,
          parentTodoCollectionId: this.resultDrop.destination?.droppableId
        }
      }
      return {
        _id: item._id,
        position: item.position
      }
    })

    const variables = [...firstCollectionVariable, ...secondCollectionVariable]

    this.client.mutate({
      mutation: this.mutation,
      variables: {
        todoTasks: {
          todoTasks: variables
        }
      },
      optimisticResponse: {},
      update(cache,) {
        cache.writeQuery({
          query: context.query,
          variables: {[context.parentVariable]: context.resultDrop.source.droppableId},
          data: {
            todoTasks: [...context.modifiedState.sourceCollection]
          }
        })

        cache.writeQuery({
          query: context.query,
          variables: {[context.parentVariable]: context.resultDrop.destination?.droppableId},
          data: {
            todoTasks: [...context.modifiedState.destinationCollection]
          }
        })
      }
    })
  }
}