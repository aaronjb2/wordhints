import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import './Menu.css';
import axios from 'axios';

class Menu extends Component{
constructor(props){
    super(props);

    this.state = {
        currentElement:'menu'
    }
}

async componentDidMount(){
    let a = await axios.get('/room/getsession');
    if (a.data.room !== ''){
        
    }
}

    render(){
        return (
            <div className = 'menu'>
                <div className='option-carrier'>
                    <button onClick={()=>this.props.changeCurrentElement('create')}>Create Game</button>
                    <button onClick={()=>this.props.changeCurrentElement('join')}>Join Game</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Menu);