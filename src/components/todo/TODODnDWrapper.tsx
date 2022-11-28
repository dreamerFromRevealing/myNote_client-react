import React from 'react';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import Preloader from "../layout/items/Preloader";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import {useMutation} from "@apollo/client";
import {UPDATE_TODO_COLLECTION} from "../../queries/treeFiles";

interface TODODnDWrapperProps {
  children: React.ReactNode;
  arrState: any;
  setArrState: any;
  todoId?: string;
}

const TodoDnDWrapper = ({children, arrState, setArrState, todoId}: TODODnDWrapperProps) => {

  const [updateCollection] = useMutation(UPDATE_TODO_COLLECTION);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result
    if (!destination || destination.index === result.source.index) {
      return;
    }

    if (type === "WRAPPERTodoCollection") {
      const items: any = Array.from(arrState);
      items[result.source.index].position = +destination.index;
      items[destination.index].position = +result.source.index;
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setArrState(items);

      updateCollection({
        variables: {
          _id: arrState[destination.index]._id,
          position: arrState[destination.index].position
        }
      })
      updateCollection({
        variables: {
          _id: arrState[result.source.index]._id,
          position: arrState[result.source.index].position
        },
        update(cache) {
          cache.writeQuery({
            query: GET_TODO_COLLECTIONS,
            variables: {parentTodoBoardParentId: todoId},
            data: {
              todoCollections: [...arrState]
            }
          })
        }
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default TodoDnDWrapper;