import * as Actions from './ActionNames'

export function AddCard(listId, cardName){
    return {
        type : Actions.CARD_ADDED,
        payload : {
            listId, 
            cardName   
        }
    }
}

export function EditCardTitle(cardId, editedCardTitle){
    return {
        type : Actions.CARD_TITLE_EDITED,
        payload : { 
            cardId, 
            editedCardTitle
        }
    }
}

export function EditCardDescription(cardId, editedCardDescription){
    return {
        type : Actions.CARD_DESC_EDITED,
        payload : {
            cardId, 
            editedCardDescription
        }
    }
}

export function RemoveCard(cardId){
    return {
        type : Actions.CARD_REMOVED,
        payload : { 
            cardId
        }
    }
}