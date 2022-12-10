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
    if (this.resultDrop.destination) this.baseMutationFunc(context, 'todoCollections')
  }

}