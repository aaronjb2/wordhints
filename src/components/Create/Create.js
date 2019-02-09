import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory} from '../../dux/reducer.js';
import './Create.css';

class Create extends Component{
constructor(props){
    super(props);

    this.state={

    }
}

render(){
    return (
        <div>
            
        </div>
    )
}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{changeRoom,changeUse,changeTurn,changeCurrentElement,changeBoard,changeHistory})(Create);