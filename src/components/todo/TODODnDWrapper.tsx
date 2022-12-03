import React from 'react';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import Preloader from "../layout/items/Preloader";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import {useMutation} from "@apollo/client";
import {MULTIPLE_DnD_UPDATE_TODO_COLLECTION, UPDATE_TODO_COLLECTION} from "../../queries/treeFiles";

interface TODODnDWrapperProps {
  children: React.ReactNode;
  currentArray: any;
  todoId?: string;
}

const parsePosition = (arr: any, sourceIndex: number, destinationIndex: number) => {
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

const TodoDnDWrapper = ({children, currentArray, todoId}: TODODnDWrapperProps) => {

  const [updateCollection] = useMutation(MULTIPLE_DnD_UPDATE_TODO_COLLECTION);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result
    if (!destination || destination.index === result.source.index) {
      return;
    }
    // Надо добавить измения кеша  переде мутацией посредством объекта cache
    //Надо закинуть оптимистичный ответ
    if (type === "WRAPPERTodoCollection") {
     const newArray = parsePosition(currentArray, source.index, destination.index)
      updateCollection({
        variables: {
          firstId: newArray[destination.index]._id,
          firstPosition: newArray[destination.index].position,
          secondId: newArray[source.index]._id,
          secondPosition: newArray[source.index].position
        },
        update(cache) {
          cache.writeQuery({
            query: GET_TODO_COLLECTIONS,
            variables: {parentTodoBoardParentId: todoId},
            data: {
              todoCollections: [...newArray]
            }
          })
        }
      })
      // updateCollection({
      //   variables: {
      //     _id: newArray[source.index]._id,
      //     position: newArray[source.index].position
      //   },
      //
      // })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default TodoDnDWrapper;