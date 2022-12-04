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

export default parsePosition;