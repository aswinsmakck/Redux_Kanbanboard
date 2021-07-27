import {combineReducers} from 'redux'
import boardReducer from './boardReducer'

export default combineReducers({
    boards : boardReducer,
});