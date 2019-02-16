import React, {Component} from 'react';
import './VerifyHintGiver.css';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';

class VerifyHintGiver extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    componentWillUpdate(){

    }

    render(){
        return (
            <div className='verifyhintgiver'>
                <h2>It is now the {this.props.turn==="Blue HintGiver"?"Blue":"Red"} HintGiver's turn</h2>
                <h3>Guessers ought not to see the content the page will now display</h3>
                <button onClick={()=>this.props.changeCurrentElement('hint')}>I am a HintGiver</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(VerifyHintGiver);