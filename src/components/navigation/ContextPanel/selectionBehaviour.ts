import { CardItem, ClickHandlerProps, ContextPanelSelection } from "./types";

function multiSelect(
  data: CardItem[],
  startId: string,
  endId: string,
  rowSelectionState: ContextPanelSelection,
): ContextPanelSelection {
  const newSelectionState = { ...rowSelectionState };

  const startIdx = data.findIndex((x) => x.id === startId);
  let endIdx = startIdx;
  while (data[endIdx].id !== endId) {
    newSelectionState[data[endIdx].id] = true;
    endIdx++;
  }
  newSelectionState[data[endIdx].id] = true;
  return newSelectionState;
}

export function getNewSelection({
  data,
  newCard,
  event,
  currentSelection,
  prevCard,
}: ClickHandlerProps): ContextPanelSelection {
  if (event.shiftKey && prevCard.current) {
    if (prevCard.current.idx < newCard.idx) {
      // Go 'up' in index (i.e. top to bottom)
      return multiSelect(
        data,
        prevCard.current.id,
        newCard.id,
        currentSelection,
      );
    } else {
      // Go 'down' in index (i.e. bottom to top)
      return multiSelect(
        data,
        newCard.id,
        prevCard.current.id,
        currentSelection,
      );
    }
  } else if (event.ctrlKey) {
    prevCard.current = newCard;
    return {
      ...currentSelection,
      [newCard.id]: !currentSelection[newCard.id], // Enable multi-select if ctrl key is held down
    };
  } else {
    prevCard.current = newCard;
    return {
      [newCard.id]: !currentSelection[newCard.id],
    };
  }
}
