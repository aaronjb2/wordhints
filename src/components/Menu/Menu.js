import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setValues} from '../../dux/reducer.js';
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
                    <button>Create Game</button>
                    <button>Join Game</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setValues})(Menu);