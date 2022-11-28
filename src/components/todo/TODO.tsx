import React from 'react';
import {TodoWrapper} from './styles';
import {TODONewCollection} from "./TODONewCollection";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import Preloader from "../layout/items/Preloader";
import TodoCollectionFunc from "./TodoCollectionFunc";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {UPDATE_TODO_COLLECTION} from "../../queries/treeFiles";
import useFormatPositionElement from "../../hooks/useFormatPositionElement";
import TodoDnDWrapper from "./TODODnDWrapper";

const TODO = () => {
  const {todoId} = useParams();
  const [arrState, setArrState, loading] = useFormatPositionElement(GET_TODO_COLLECTIONS, {
    parentTodoBoardParentId: todoId
  }, 'todoCollections')

  if (loading) return <Preloader/>
  return (
    <TodoDnDWrapper todoId={todoId} arrState={arrState} setArrState={setArrState}>
      <Droppable droppableId="wrapper" type="WRAPPERTodoCollection" direction="horizontal">
        {(provided) => (
          <TodoWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {arrState && arrState.map((item: any, index: number) => (
              <TodoCollectionFunc
                key={item._id}
                color={item.color}
                title={item.title}
                parentTodoBoardParentId={todoId || ''}
                id={item._id}
                index={index}
              />
            ))}
            {provided.placeholder}
            <TODONewCollection parentTodoBoardParentId={todoId} countItems={arrState.length || 0}/>
          </TodoWrapper>
        )}
      </Droppable>
    </TodoDnDWrapper>
  );
};

export default TODO;