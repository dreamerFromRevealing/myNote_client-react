const sortItemByPosition = (item: any) => item.sort((a: any, b: any) => {
  return a.position - b.position
})

export default sortItemByPosition