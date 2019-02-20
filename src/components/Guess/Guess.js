import React, {Component} from 'react';
import './Guess.css';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect();

class Guess extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex:-1,
        }
    }

    componentDidMount(){

    }

    componentWillUpdate(){

    }

    async selectWord(index){
        if (index !== this.state.selectedIndex){
            this.setState({selectedIndex:index});
        }else{
            let numberOfConsecutiveCorrectGuesses = 0;
            let hitTheEnd = false;
            let foundLastHint = false;
            let allottedNumber = -1;
            for (let i = this.props.history.length-1; i >= 0; i--){
                if (((this.props.turn==='Blue Guesser' && this.props.history[i].color==='blue') || (this.props.turn==='Red Guesser' && this.props.history[i].color==='red')) && !hitTheEnd){
                    numberOfConsecutiveCorrectGuesses++;
                }else{
                    hitTheEnd = true;
                }
                if (this.props.history[i].hintgiver && !foundLastHint){
                    allottedNumber = this.props.history[i].number;
                    foundLastHint = true;
                }
            }
            let a = await axios.put('/board/addhistory',{room:this.props.sessionRoom,color:this.props.turn==='Blue Guesser'?'blue':'red',hintgiver:false,word:this.props.board[index].word,number:1,correct:(this.props.board[index].color==='blue' && this.props.turn==='Blue Guesser') || (this.props.board[index].color==='red' && this.props.turn==='Red Guesser')?true:false,endofturn:(allottedNumber !== numberOfConsecutiveCorrectGuesses && ((this.props.board[index].color==='blue' && this.props.turn==='Blue Guesser') || (this.props.board[index].color==='red' && this.props.turn==='Red Guesser')))?false:true,voluntary_end:false})
            socket.emit('update',{room:this.props.sessionRoom});
        }
    }

    displayRemainingWords(){
        return this.props.board.map((element,index,arr)=>{
            if (element.guessed===false){
                return (
                    <button onClick = {()=>this.selectWord(index)} className='word-container' id={this.state.selectedIndex===index?'chosen':'not-chosen'}>
                        <h6>{element.word}</h6>
                    </button>
                )
            }
        })
    }

    render(){
        return (
            <div className='guess'>
                <h1>Guess What</h1>
                <h1>What?</h1>
                <div className='words-shown-option-buttons'>
                    <button>All Words</button>
                    <button>Remaining Words</button>
                </div>
                <div>Select the words you beleive your teamate wants you to touch.</div>
                <div>Start with the word your most confident about first.</div>
                <div>Your turn ends when you guess a word that doesn't belong to your team, or if you guess the number of words attached to the most recent hint + 1</div>
                <div>Most Recent Hint: {this.props.history[this.props.history.length-1].word} Number of words it applies to: {this.props.history[this.props.history.length-1].number}</div>
                {this.displayRemainingWords()}
                <h1 className = 'space'>aa</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Guess);