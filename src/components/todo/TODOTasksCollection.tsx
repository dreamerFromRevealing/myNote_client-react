import React from 'react';
import TodoTask from "./TODOTask";
import {GET_TODO_TASKS} from "../../queries/queries";
import {useQuery} from "@apollo/client";

interface TodoTasksCollectionProps {
  parentTodoCollectionId: string;
}

const TodoTasksCollection = ({parentTodoCollectionId}: TodoTasksCollectionProps) => {
const {data} = useQuery(GET_TODO_TASKS, {
  variables: {parentTodoCollectionId}
})

  return (
    <div>
      {data?.todoTasks.map((task: any) => (
        <TodoTask
          key={task._id}
          _id={task._id}
          title={task.title}
          description={task?.description}
          parentTodoCollectionId={parentTodoCollectionId}
        />
      ))}
    </div>
  );
};

export default TodoTasksCollection;