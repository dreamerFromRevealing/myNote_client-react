export type DATAType = {
  _id: string
  title?: string
  children?: DATAType[]
  __typename?: string
  parentWorkspaceId?: {_id: string}
}