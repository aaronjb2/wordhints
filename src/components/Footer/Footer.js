import './Footer.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component{
    constructor(props){
        super(props);

        this.state={
            
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    render(){
        return (
            <div className='footer'>
                <div className='container-of-session-details'>
                    <h3 className='room'>Room: {this.state.sessionRoom===''?'None Selected':this.state.sessionRoom}</h3>
                    <h3 className='use'>Device Use: {this.state.sessionRoom===''?'None Yet':this.state.sessionUse}</h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Footer);