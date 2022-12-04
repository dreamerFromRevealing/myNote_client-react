import React from 'react';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import parsePosition from "./parsePosition";
import useGetDataForDnD from "./useGetDataForDnD";
import useMakeUpdate from "./useMakeUpdate";
import {ApolloClient} from "@apollo/client/core";

/**
 * HOC компонент для обработки перемещения элементов с помощью react-beautiful-dnd
 */
interface DnDWrapperProps {
  children: React.ReactNode;
  client: ApolloClient<any>;
}

const DnDWrapperFunc = ({children, client}: DnDWrapperProps) => {
  console.log('DnDWrapper render', client)

  const getCurrentArray = useGetDataForDnD()
  const makeUpdate = useMakeUpdate()

  const onDragEnd = async (result: DropResult) => {
    const {destination, source, type} = result
    if (!destination || destination.index === result.source.index) {
      return;
    }
    const [currentArray, queryState] = await getCurrentArray(type, source.droppableId)
    console.log('currentArray', result)
    // const newArray = parsePosition(currentArray, source.index, destination.index)
    // await makeUpdate(newArray, type, source.index, destination.index, source.droppableId, queryState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default DnDWrapperFunc;