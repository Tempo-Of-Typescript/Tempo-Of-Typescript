import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';

class Routes extends React.Component {    
    render(){
        return(
            <Router>
                <div>
                    We started capstone!! Woohoo
                </div> 
            </Router>
        )
    }

}

export default connect(null, null)(Routes)