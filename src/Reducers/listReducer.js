import _ from 'lodash';
import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'


const addList = (lists, payload) => {

    let id = nanoid();

    let newList = {
        id,
        boardId : payload.boardId,
        name : payload.listName
    }
    console.log("list reducer", { byId : {...lists.byId, [id] : newList } })
    return { byId : {...lists.byId, [id] : newList } };
}

const editListName = (lists, payload) => {
    
    let editedListName = payload.editedListName;
    let listId = payload.listId;
    if(editedListName.trim() === "") return lists;
    lists.byId[listId].name = editedListName;

    return lists;
        
}

export default function listReducer(originalState={ byId : {} }, action){

    let state = _.cloneDeep(originalState);

    switch(action.type){

        case Actions.LIST_ADDED :
            return addList(state, action.payload);
        
        case Actions.LIST_NAME_EDITED :
            return editListName(state, action.payload);

        default :
            return state;
    }
}