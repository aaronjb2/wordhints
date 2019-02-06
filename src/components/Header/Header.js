import './Header.css';
import React, {Component} from 'react';

class Header extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className='header'>
                <h1>Word Hints</h1>
            </div>
        )
    }
}

export default Header;