import React, {Component} from 'react';
import './Hint.css';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect();

class Hint extends Component{
    constructor(props){
        super(props);
        this.state = {
            hint:'',
            number:''
        }
        
    }

    componentDidMount(){
        
    }

    componentWillUpdate(){

    }

    displayYourRemainingWords(){
        if (this.props.sessionUse==='Red HintGiver' || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Red HintGiver') || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Blue Guesser') ||
        (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Red HintGiver') ){
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='red' && element.guessed===false){
                    return (
                        <div className='word-container' id='red-remaining'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }else{
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='blue' && element.guessed===false){
                    return (
                        <div className='word-container' id='blue-remaining'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }
    }

    displayEnemyRemainingWords(){
        if (this.props.sessionUse==='Red HintGiver' || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Red HintGiver') || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Blue Guesser') ||
        (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Red HintGiver') ){
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='blue' && element.guessed===false){
                    return (
                        <div className='word-container' id='blue-remaining'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }else{
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='red' && element.guessed===false){
                    return (
                        <div className='word-container' id='red-remaining'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }
    }
    
    displayYourGuessedWords(){
        if (this.props.sessionUse==='Red HintGiver' || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Red HintGiver') || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Blue Guesser') ||
        (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Red HintGiver') ){
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='red' && element.guessed===true){
                    return (
                        <div className='word-container' id='red-guessed'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }else{
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='blue' && element.guessed===true){
                    return (
                        <div className='word-container' id='blue-guessed'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }
    }

    displayEnemyGuessedWords(){
        if (this.props.sessionUse==='Red HintGiver' || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Red HintGiver') || 
        (this.props.sessionUse === 'Shared HintGiver' && this.props.turn === 'Blue Guesser') ||
        (this.props.sessionUse === 'Shared Everything' && this.props.turn === 'Red HintGiver') ){
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='blue' && element.guessed===true){
                    return (
                        <div className='word-container' id='blue-guessed'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }else{
            return this.props.board.map((element,index,arr)=>{
                if (element.color==='red' && element.guessed===true){
                    return (
                        <div className='word-container' id='red-guessed'>
                            <h6>{element.word}</h6>
                        </div>
                    )
                }
            })
        }
    }

    displayNeutralRemainingWords(){
        return this.props.board.map((element,index,arr)=>{
            if (element.color==='tan' && element.guessed===false){
                return (
                    <div className='word-container' id='tan-remaining'>
                        <h6>{element.word}</h6>
                    </div>
                )
            }
        })
    }

    displayNeutralGuessedWords(){
        return this.props.board.map((element,index,arr)=>{
            if (element.color==='tan' && element.guessed===true){
                return (
                    <div className='word-container' id='tan-guessed'>
                        <h6>{element.word}</h6>
                    </div>
                )
            }
        })
    }

    displayDeathWord(){
        return this.props.board.map((element,index,arr)=>{
            if (element.color==='black'){
                return (
                    <div className='word-container' id='black'>
                        <h6>{element.word}</h6>
                    </div>
                )
            }
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    async submitHint(){
        let a = await axios.put('/board/addhistory',{room:this.props.sessionRoom,color:this.props.turn==='Red HintGiver'?'red':'blue',hintgiver:true,word:this.state.hint,number:this.state.number,correct:false,endofturn:true,voluntary_end:false})
        socket.emit('update',{room:this.props.sessionRoom});
    }

    render(){
        return (
            <div className='hint'>
                <h1>Some people can't take a hint</h1>
                <div className='words-shown-option-buttons'>
                    <button>All Words</button>
                    <button>Remaining Words</button>
                </div>
                <div>Hint:</div>
                <div>One word only, don't cheat</div>
                <div>Word:<input name='hint' onChange={e=>this.handleChange(e)}/>Number:<input name='number' type='number' onChange={e=>this.handleChange(e)}/><button disabled={this.state.hint==='' || this.state.number===''} onClick={()=>this.submitHint()}>Enter</button></div>
                <div>Your one-word hint should make your team guess as many of these words as possible without guessing the other words</div>
                {this.displayYourRemainingWords()}
                {this.displayYourGuessedWords()}
                <div>The Death Word</div>
                <div>Be careful your hint doesn't make them guess this word</div>
                {this.displayDeathWord()}
                <div>Enemy Words</div>
                <div>You will help the other team if your team guesses one of these</div>
                {this.displayEnemyRemainingWords()}
                {this.displayEnemyGuessedWords()}
                <div>Neutral Words</div>
                <div>These words are Nobody's</div>
                {this.displayNeutralRemainingWords()}
                {this.displayNeutralGuessedWords()}
                <h1 className = 'space'>aa</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Hint);