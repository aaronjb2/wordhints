import React, {Component} from 'react';
import './Whole.css';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Menu from '../Menu/Menu.js';
import {connect} from 'react-redux';
import {setValues} from '../../dux/reducer.js';
import axios from 'axios';

class Whole extends Component{
constructor(props){
    super(props);

    this.state = {
        currentElement:'menu'
    }
    this.setCurrentElement=this.setCurrentElement.bind(this);
}

async componentDidMount(){
    let a = await axios.get('/room/getsession');
    if (a.data.room !== ''){

    }
}

setCurrentElement(element){
    this.setState({currentElement:element})
}



    render(){
        return (
            <div className='whole'>
                <Header></Header>
                <div className='space'></div>
                    {this.state.currentElement==='menu'?
                    <Menu className='menu'/>
                    :
                    null}
                <Footer></Footer>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setValues})(Whole);