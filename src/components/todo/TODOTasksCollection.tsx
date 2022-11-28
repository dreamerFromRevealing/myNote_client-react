import React from 'react';
import TodoTask from "./TODOTask";
import {GET_TODO_COLLECTIONS, GET_TODO_TASKS} from "../../queries/queries";
import {useQuery} from "@apollo/client";
import useFormatPositionElement from "../../hooks/useFormatPositionElement";
import {Draggable} from "react-beautiful-dnd";

interface TodoTasksCollectionProps {
  parentTodoCollectionId: string;
  todoTasks: any;
  provided: any;
}

const TodoTasksCollection = ({parentTodoCollectionId, todoTasks, provided}: TodoTasksCollectionProps) => {


  return (
    <div >
      {todoTasks && todoTasks.map((task: any, index: number) => (
        <Draggable key={task._id} draggableId={"drag-id-" + task._id} index={index}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoTask
                key={task._id}
                _id={task._id}
                title={task.title}
                description={task?.description}
                parentTodoCollectionId={parentTodoCollectionId}
              />
            </div>
)}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};

export default TodoTasksCollection;