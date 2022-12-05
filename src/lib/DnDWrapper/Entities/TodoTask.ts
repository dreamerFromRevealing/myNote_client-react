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
        const data = {
          sourceCollection: this.client.readQuery({
            query: this.query,
            variables: {[this.parentVariable]: this.resultDrop.source.droppableId}
          }).todoTasks,
          destinationCollection: this.client.readQuery({
            query: this.query,
            variables: {[this.parentVariable]: this.resultDrop.destination?.droppableId}
          }).todoTasks
        }
        this.currentState = data
      }
    }
  }

  modifyState(): any {
    if (!!this.resultDrop?.destination) {
      if (this.resultDrop.source.droppableId === this.resultDrop.destination?.droppableId) {
        this.modifiedState = this.parsePosition(this.currentState.todoTasks, this.resultDrop.source.index, this.resultDrop.destination.index)
      } else {
        // с одной части нам надо удалить, а вот как бывставить в о вторую нато конечную цель внимательнее посмотреть
        // тут мы удаляем с предыдущей часи (при этом всем надо после удаления из масива правильно скоректировать позиции)
        console.log('before', this.currentState.sourceCollection)
        this.currentState.sourceCollection.splice(this.resultDrop.source.index)
        console.log('after', this.currentState.sourceCollection)
        // ==============================================
        // тут мы интегрируем в следющую часть

        //===================================
        console.log('modifyState', this.resultDrop)
      }
    }
  }

  updateState(): any {
  }


}