import React, {Component} from 'react';
import './Whole.css';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Menu from '../Menu/Menu.js';
import Create from '../Create/Create.js';
import Join from '../Join/Join.js';
import Use from '../Use/Use.js';
import VerifyHintGiver from '../VerifyHintGiver/VerifyHintGiver.js';
import Hint from '../Hint/Hint.js';
import Guess from '../Guess/Guess.js';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';
import io from 'socket.io-client';

//const socket = io.connect('http://localhost:3890');
const socket = io.connect();

class Whole extends Component{
constructor(props){
    super(props);

    this.state = {
    }
    this.joinRoom = this.joinRoom.bind(this);
    socket.on('update',async data=>{
        let a = await axios.get(`/board/gethistory/${this.props.sessionRoom}`);
        await this.props.changeBoard(a.data.board);
        await this.props.changeHistory(a.data.history);
        await this.props.changeTurn(a.data.turn);
        await this.props.changeCurrentElement(
            this.props.sessionUse==='Red HintGiver' || this.props.sessionUse==='Blue HintGiver' || this.props.sessionUse==='Shared HintGiver'?
            'hint'
            :
            (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Red HintGiver') || (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Blue HintGiver')?
            'verifyhintgiver'
            :
            this.props.sessionUse==='Red Guesser' || this.props.sessionUse==='Blue Guesser' || this.props.sessionUse==='Shared Guesser' ||
            (this.props.sessionUse === 'Shared Everything' && this.props.turn==='Blue Guesser') || (this.props.sessionUse === 'Shared Everything' && this.props.turn==='Red Guesser')?
            'guess'
            :
            'hint'
        );
    })
}

async componentDidMount(){
    let a = await axios.get('/room/getsession');
    if (a.data.sessionRoom !== '' && a.data.sessionRoom){
        await this.props.changeRoom(a.data.sessionRoom);
        socket.emit('join-room',{room:this.props.sessionRoom})
        await this.props.changeUse(a.data.sessionUse);
        let b = await axios.get(`/board/gethistory/${this.props.sessionRoom}`);
        await this.props.changeTurn(b.data.turn);
        await this.props.changeBoard(b.data.board);
        await this.props.changeHistory(b.data.history);
        await this.props.changeCurrentElement(
            this.props.sessionRoom !== '' && this.props.sessionUse === "None Selected"?
            'use'
            :
            this.props.sessionRoom !== '' && this.props.sessionUse === 'Shared Everything' && (this.props.turn==='Blue HintGiver' || this.props.turn==='Red HintGiver')?
            'verifyhintgiver'
            :
            this.props.sessionRoom !== '' && this.props.sessionUse === 'Shared Everything' && (this.props.turn ==='Blue Guesser' || this.props.turn ==='Red Guesser')?
            'guess'
            :
            'menu'
        );
    }
}

joinRoom(){
    if (this.props.sessionRoom !== '' && this.props.sessionRoom){
        socket.emit('join-room',{room:this.props.sessionRoom})
    }
}

    render(){
        return (
            <div className='whole'>
                <Header></Header>
                <div className='space'></div>
                    {this.props.currentElement==='menu'?
                    <Menu/>
                    :this.props.currentElement==='create'?
                    <Create/>
                    :this.props.currentElement==='join'?
                    <Join/>
                    :this.props.currentElement==='use'?
                    <Use joinRoom={this.joinRoom}/>
                    :this.props.currentElement==='verifyhintgiver'?
                    <VerifyHintGiver/>
                    :this.props.currentElement==='hint'?
                    <Hint/>
                    :this.props.currentElement==='guess'?
                    <Guess/>
                    :
                    null}
                <Footer></Footer>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Whole);