import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'
import _ from 'lodash';

const addList = (boards, payload) => {

    let id = nanoid();

    let boardIndex = boards.findIndex(board => board.id === payload.boardId)

    console.log("boardindex",boardIndex);

    let lists = [...boards[boardIndex].lists];
    
    lists.push({ id: id, name : payload.listName});

    boards[boardIndex] = {...boards[boardIndex], lists : lists}

    return boards;
}

const editListName = (boards, payload) => {

    let editedListName = payload.editedListName;
    let listId = payload.listId;
    let boardId = payload.boardId;

    if(editedListName.trim() === "") return boards;
    let boardIndex = boards.findIndex(board => board.id === boardId) 
    let lists = _.cloneDeep(boards[boardIndex]).lists.map((list) => {
        if(list.id === listId){
            list.name = editedListName;
        }
        
        return list;
    })
    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    return boards;
        
}

const addCard = (boards, payload) => {

    let boardId = payload.boardId;
    let listId = payload.listId;
    let cardName = payload.cardName;

    if(cardName.trim() === "") return boards;
    
    let boardIndex = boards.findIndex(board => board.id === boardId) 
    let id = nanoid();
    let lists = boards[boardIndex].lists.map((list) => {
        if(list.id === listId){
            if(!('cards' in list)){
                list.cards = []
            }
            list.cards.push({id : id, title : cardName , desc : ""});
        }
        
        return list;
    })
    
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    
    return boards;
}

const removeCard = (boards, payload) => {
    
    let boardId = payload.boardId;
    let listId = payload.listId;
    let cardId = payload.cardId;

    let boardIndex = boards.findIndex(board => board.id === boardId) 
    let lists = boards[boardIndex].lists.map((list) => {
        if(list.id === listId){
            let cards = list.cards;
            cards.splice(cards.findIndex(card => card.id === cardId) , 1)
        }
        
        return list;
    })

    console.log("lists",lists)
    
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    return boards;
}

const editCardTitle = (boards, payload) => {
    let boardId = payload.boardId;
    let listId = payload.listId;
    let cardId = payload.cardId;
    let editedCardTitle = payload.editedCardTitle;

    if(editedCardTitle.trim() === "") return boards;
    let boardIndex = boards.findIndex(board => board.id === boardId)
    let lists = boards[boardIndex].lists.map((list) => {
        if(list.id === listId){
            list.cards.map(card => {
                if(card.id === cardId){
                    card.title = editedCardTitle;
                }
                return card;
            })
        }
        
        return list;
    })

    boards[boardIndex] = {...boards[boardIndex], lists:lists}

    return boards;
}

const editCardDescription = (boards, payload) => {

    let boardId = payload.boardId;
    let listId = payload.listId;
    let cardId = payload.cardId;
    let editedCardDescription = payload.editedCardDescription;

    let boardIndex = boards.findIndex(boardObj => boardObj.id === boardId) 
    let lists = boards[boardIndex].lists
    
    let list = lists[lists.findIndex(list => list.id === listId)]

    let card = list.cards[list.cards.findIndex(card => card.id === cardId)]
    card.desc = editedCardDescription;

    console.log("lists in card modal",lists)
    boards[boardIndex] = {...boards[boardIndex], lists:lists}
    return boards;
}

export default function boardReducer(originalState = [] , action){

    let state = _.cloneDeep(originalState);

    console.log("In Board reducer",state);
    switch(action.type){

        case Actions.BOARD_ADDED :

            let id = nanoid();
            return [
                    ...state, 
                    {
                        id : id,
                        name: action.payload.boardName,
                        lists : []
                    }
            ];
        
        case Actions.LIST_ADDED :
            return addList(state, action.payload);
        
        case Actions.LIST_NAME_EDITED :
            return editListName(state, action.payload);
            
        case Actions.CARD_ADDED :
            return addCard(state, action.payload);

        case Actions.CARD_REMOVED :
            return removeCard(state, action.payload);

        case Actions.CARD_TITLE_EDITED :
            return editCardTitle(state, action.payload);

        case Actions.CARD_DESC_EDITED :
            return editCardDescription(state, action.payload);

        default :
            return state;
    }
}