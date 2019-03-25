import React, { Component } from 'react';
import LoginView from './LoginView';
import { connect } from 'react-redux';
import axios from 'axios';
import * as loginActions from 'app/actions/loginActions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        };
        this.connectToWifi = this.connectToWifi.bind(this);
    }
    connectToWifi() {
        this.setState({connected: true});

    }
    render() {
        return <LoginView handleConnect={() => this.connectToWifi} connected={this.state.connected}{...this.props} />;
    }
}

function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: (un, pwd) => dispatch(loginActions.requestLogin(un, pwd))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
