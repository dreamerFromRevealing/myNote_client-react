import Base from "./Base";
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
      // Теперь тут меняем кеш и после этого отправляем запрос на сервер используя fetch
      //1 - меняем кеш
      // this.client.cache.modify({
      //   fields: {
      //     todoCollections(existingTodoCollections = [], {readField}) {
      //       console.log(readField('position', existingTodoCollections[0]))
      //       const newTodoCollections = [...existingTodoCollections];
      //       if (context.resultDrop.destination) {
      //         newTodoCollections.splice(context.resultDrop.destination.index, 0, newTodoCollections.splice(context.resultDrop.source.index, 1)[0]);
      //       }
      //       return newTodoCollections;
      //     }
      //
      //   }
      // })
      const variables = this.modifiedState.map((item: any) => {
        return {
          _id: item._id,
          position: item.position
        }
      })
      this.client.mutate({
        mutation: this.mutation,
        variables: {
          arrCollections: {
            arrCollections: variables
          }
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