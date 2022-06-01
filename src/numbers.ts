function removeNullable(data: number[][]) {
  return data.map((collection) => collection.filter((row) => row !== 0));
}

function transformToCol(data: boolean[][]) {
  return data.map((_, index) => {
    return data.reduce((prevCollection, currentCollection) => {
      return [...(prevCollection || []), currentCollection[index]];
    }, []);
  });
}

function reduceSetOfBooleansToNumbers(data: boolean[]) {
  return data.reduce((prevSet, currentSet) => {
    if (!currentSet) return [...(prevSet || []), 0];

    const lastElement = prevSet[prevSet.length - 1] || 0;
    const currentSetCopy = [...(prevSet || [1])];

    if (currentSetCopy.length === 0) return [1];

    currentSetCopy[currentSetCopy.length - 1] = lastElement + 1;
    return [...currentSetCopy];
  }, [] as number[]);
}

function calculateRow(data: boolean[][]) {
  return removeNullable(data.map(reduceSetOfBooleansToNumbers));
}

function calculateCol(data: boolean[][]) {
  const transformedData = transformToCol(data);
  return removeNullable(calculateRow(transformedData));
}

export { calculateRow, calculateCol };
