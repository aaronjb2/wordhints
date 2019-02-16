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
                    <h3 className='room'>Room: {this.props.sessionRoom===''?'Select':this.props.sessionRoom}</h3>
                    <h3 className='use'>Device Use: {this.props.sessionRoom===''?'None Yet':this.props.sessionUse}</h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Footer);