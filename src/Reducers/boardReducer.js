import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'
import _ from 'lodash';

export default function boardReducer(originalState = { byId : {} } , action){

    let state = _.cloneDeep(originalState);
    
    switch(action.type){

        case Actions.BOARD_ADDED :

            let id = nanoid();
            return ({
                        byId :{
                            ...state.byId,
                            [id] : {
                                id,
                                name : action.payload.boardName
                            }
                    }
            });

        default :
            return state;
    }
}