import React, {Component} from 'react';
import './Whole.css';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Menu from '../Menu/Menu.js';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import axios from 'axios';

class Whole extends Component{
constructor(props){
    super(props);

    this.state = {
    }
}

async componentDidMount(){
    let a = await axios.get('/room/getsession');
    if (a.data.room !== ''){

    }
}


    render(){
        return (
            <div className='whole'>
                <Header></Header>
                <div className='space'></div>
                    {this.props.currentElement==='menu'?
                    <Menu/>
                    :
                    null}
                <Footer></Footer>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Whole);