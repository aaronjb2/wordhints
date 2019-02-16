import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';
import './Join.css';

class Join extends Component{
constructor(props){
    super(props);

    this.state={
        room:''
    }
}

handleChange(e){
this.setState({
    [e.target.name]:e.target.value
})
}

async joinGame(){
    if (this.state.room !== ''){
        let a = await axios.get(`/board/checkforboard/${this.state.room}`);
        if (a.data === true){
            let b = await axios.post(`/room/joinsession`,{room:this.state.room});
            await this.props.changeRoom(b.data.sessionRoom);
            let c = await axios.get(`/board/gethistory/${this.props.sessionRoom}`);
            this.props.changeUse(b.data.sessionUse);
            this.props.changeCurrentElement('use');
            this.props.changeHistory(c.data.history);
            this.props.changeTurn(c.data.turn);
            this.props.changeBoard(c.data.board);
        }
    }
}

render(){
    return (
        <div className='join'>
            <div className='option-carrier'>
                <div className='room-finder'><input name='room' className='room' onChange={e=>this.handleChange(e)}/><button className='room-button' onClick={()=>this.joinGame()}>Join</button></div>
                <div className='room-finder'><button onClick={()=>this.props.changeCurrentElement('menu')}>Back</button></div>
            </div>
        </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Join);