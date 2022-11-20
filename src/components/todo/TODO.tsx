import React, {useEffect, useState} from 'react';
import {TodoWrapper} from './styles';
import {TODONewCollection} from "./TODONewCollection";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import Preloader from "../layout/items/Preloader";
import TodoCollectionFunc from "./TodoCollectionFunc";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {UPDATE_TODO_COLLECTION} from "../../queries/treeFiles";
import _ from "lodash";

const TODO = () => {
  const [collections, setCollections] = useState<any>([]);
  const {todoId} = useParams();
  const {data, loading} = useQuery(GET_TODO_COLLECTIONS, {
    variables: {
      parentTodoBoardParentId: todoId
    }
  })
  const [updateCollection] = useMutation(UPDATE_TODO_COLLECTION);

  useEffect(() => {
    if (!!data) {
      // copy data?.todoCollections use lodash
      const copyTodoCollections = _.cloneDeep(data?.todoCollections);
      const sortArray = sortCollections(copyTodoCollections)
      setCollections(sortArray)
    }
  }, [data])

  const sortCollections = (collections: any) => collections.sort((a: any, b: any) => {
    return a.position - b.position
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
    const items:any = Array.from(collections);
    items[result.source.index].position = +result.destination.index;
    items[result.destination.index].position = +result.source.index;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCollections(items);

    //Терь тут после перстановки надо что бы колекции поменялись порядковыми номерами и после обновленные о них данные отправились на сервер
    updateCollection({
      variables: {
        _id: collections[result.destination.index]._id,
        position: collections[result.destination.index].position
      }
    })
    updateCollection({
      variables: {
        _id: collections[result.source.index]._id,
        position: collections[result.source.index].position
      }
    })
  }
  if (loading) return <Preloader/>
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="wrapper" type="WRAPPER" direction="horizontal">
        {(provided) => (
          <TodoWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {collections && collections.map((item: any, index: number) => (
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
            <TODONewCollection parentTodoBoardParentId={todoId} countItems={data?.todoCollections.length || 0}/>
          </TodoWrapper>
        )}
      </Droppable>
    </DragDropContext>


  );
};

export default TODO;