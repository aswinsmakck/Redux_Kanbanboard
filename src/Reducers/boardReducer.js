import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'

export default function boardReducer(state = {boards : []} , action){
    switch(action.type){

        case Actions.BOARD_ADDED :

            let id = nanoid();
            return {
                boards : [
                    ...state.boards, 
                    {
                        id : id,
                        name: action.payload.boardName,
                        lists : []
                    }
                ],
            }

        default :
            return state;
    }
}