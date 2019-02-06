let initialState = {
    sessionRoom:'',
    sessionUse:'',
    turn:''
}

const SET_VALUES = "SET_VALUES";

export default function reducer(state=initialState,action){
    switch(action.type){
        case SET_VALUES:
        return {
            sessionRoom:action.sessionRoom,
            sessionUse:action.sessionUse,
            turn:action.turn
        }
        default:
        return state;
    }
}

export function setValues(sessionRoom,sessionUse,turn){
    return {sessionRoom,sessionUse,turn}
}