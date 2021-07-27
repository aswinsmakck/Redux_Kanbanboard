import * as Actions from './ActionNames'

export function AddList(boardId, listName) {
    return { 
        type: Actions.LIST_ADDED, 
        payload: { 
            boardId,
            listName
        } 
    };
}

export function EditListName(boardId, listId, editedListName) {
    return { 
        type: Actions.LIST_NAME_EDITED, 
        payload: { 
            boardId,
            listId,
            editedListName
        } 
    };
}