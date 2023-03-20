export type DATAType = {
  _id: string
  title?: string
  children?: DATAType[]
  __typename: string
  parentProjectId?: { _id: string }
  childTodoBoardIds?: TodoBoardType[] | TodoBoardType
}

export type TodoBoardType = {
  _id: string
  title: string
  childrenTodoCollectionIds?: todoCollectionType[] | todoCollectionType
}

type todoCollectionType = {
  _id: string
  title: string
  color: string
  childrenTodoTaskIds?: todoTaskType[] | todoTaskType
}

type todoTaskType = {
  _id: string
  title: string
  description: string
}