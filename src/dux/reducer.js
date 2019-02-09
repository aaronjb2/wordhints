let initialState = {
    sessionRoom:'',
    sessionUse:'',
    turn:'',
    currentElement:'menu',
    board:[],
    history:[]
}

const CHANGE_ROOM = "CHANGE_ROOM";
const CHANGE_USE = "CHANGE_USE";
const CHANGE_TURN = "CHANGE_TURN";
const CHANGE_CURRENT_ELEMENT = "CHANGE_CURRENT_ELEMENT";
const CHANGE_BOARD = "CHANGE_BOARD";
const CHANGE_HISTORY = "CHANGE_HISTORY";

export default function reducer(state=initialState,action){
    switch(action.type){
        case CHANGE_ROOM:
        return {...state,sessionRoom:action.sessionRoom}
        case CHANGE_USE:
        return {...state,sessionUse:action.sessionUse}
        case CHANGE_TURN:
        return {...state,turn:action.turn}
        case CHANGE_CURRENT_ELEMENT:
        return {...state,currentElement:action.currentElement}
        case CHANGE_BOARD:
        return {...state,board:action.board}
        case CHANGE_HISTORY:
        return {...state,history:action.history}
        default:
        return state;
    }
}

export function changeRoom(sessionRoom){
    return {sessionRoom,type:CHANGE_ROOM}
}

export function changeUse(sessionUse){
    return {sessionUse,type:CHANGE_USE}
}

export function changeTurn(turn){
    return {turn,type:CHANGE_TURN}
}

export function changeCurrentElement(currentElement){
    return {currentElement,type:CHANGE_CURRENT_ELEMENT}
}

export function changeBoard(board){
    return {board,type:CHANGE_BOARD}
}

export function changeHistory(history){
    return {history,type:CHANGE_HISTORY}
}