import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Use.css';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect();

class Use extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        console.log('this.props.sessionRoom:',this.props.sessionRoom)
        this.props.joinRoom();
    }

    componentWillMount(){

    }

    async setUse(use){
        let a = await axios.put('/room/selectuse',{use});
        await this.props.changeUse(use);
        this.props.changeCurrentElement(
            use==='Shared Everything' && (this.props.turn === 'Blue HintGiver' || this.props.turn === 'Red HintGiver')?
            'verifyhintgiver'
            :
            'use'
        )
    }

    render(){
        return (
            <div className='use'>
                <h1>What is this device being used for?</h1>
                <button className='use-option' id='use-option-red-hintgiver'>
                    <h1>Red HintGiver</h1>
                    <h6>Ideally only 1 person does this</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-blue-hintgiver'>
                    <h1>Blue HintGiver</h1>
                    <h6>Ideally only 1 person does this</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-double-hintgiver'>
                    <h1>Shared HintGiver Device</h1>
                    <h6>For if HintGivers want to use the same device</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-red-guesser'>
                    <h1>Red Guesser Device</h1>
                    <h6>No limit, ideally 3 people or less do this</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-blue-guesser'>
                    <h1>Blue Guesser Device</h1>
                    <h6>No limit, ideally 3 people or less do this</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-double-guesser'>
                    <h1>Shared Guesser Device</h1>
                    <h6>For if Guessers want to use the same device</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-everything' onClick={()=>this.setUse('Shared Everything')}>
                    <h1>Shared Everything Device</h1>
                    <h6>Everyone can play on the same device, less convenient though</h6>
                </button>
                <div className='tiny-space'></div>
                <button className='use-option' id='use-option-display'>
                    <h1>Display-Only Device</h1>
                    <h6>Ideal for a large screen, Simply shows the board</h6>
                </button>
                <h1>{this.props.turn}</h1>
                <div className='space'>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Use);