import * as Actions from './ActionNames'

export function AddCard(boardId, listId, cardName){
    return {
        type : Actions.CARD_ADDED,
        payload : {
            boardId, 
            listId, 
            cardName   
        }
    }
}

export function EditCardTitle(boardId, listId, cardId, editedCardTitle){
    return {
        type : Actions.CARD_TITLE_EDITED,
        payload : {
            boardId, 
            listId, 
            cardId, 
            editedCardTitle
        }
    }
}

export function EditCardDescription(boardId, listId, cardId, editedCardDescription){
    return {
        type : Actions.CARD_DESC_EDITED,
        payload : {
            boardId, 
            listId, 
            cardId, 
            editedCardDescription
        }
    }
}

export function RemoveCard(boardId, listId, cardId){
    return {
        type : Actions.CARD_REMOVED,
        payload : {
            boardId, 
            listId, 
            cardId
        }
    }
}