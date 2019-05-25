import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../common/colors';
import { PADDING, BORDER_RADIUS } from '../common/styles';
import { logUserIn } from '../actions';
import i18n from '../i18n';

const InputText = React.forwardRef((props, ref) => {
    const [text, setText] = useState('');
    onChangeText = (text) => {
        setText(text);
        props.onChangeText(text);
    };
    return <TextInput {...props} ref={ref} style={styles.textInput} onChangeText={onChangeText} />;
});
export class LoginScene extends Component {
    state = {
        login: '',
        password: ''
    };

    setLogin = (login) => this.setState({ login });

    setPassword = (password) => this.setState({ password });

    logUserIn = () => {
        const { logUserIn } = this.props;
        const { login, password } = this.state;
        logUserIn({
            login,
            password
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{i18n.t('sign_in_manually')}</Text>
                <InputText
                    ref={(ref) => (this.login = ref)}
                    placeholder={i18n.t('username_or_email')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setLogin}
                />
                <InputText
                    ref={(ref) => (this.password = ref)}
                    placeholder={i18n.t('password')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setPassword}
                />

                <TouchableOpacity style={styles.login} onPress={this.logUserIn}>
                    <Text style={styles.loginTxt}>{i18n.t('login').toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    logUserIn
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: PADDING
    },
    title: {
        fontWeight: 'bold',
        color: colors.darkGray,
        fontSize: 16
    },
    textInput: {
        width: '100%',
        height: 50,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.lightGray,
        padding: 8,
        fontWeight: 'bold'
    },
    login: {
        padding: PADDING,
        backgroundColor: colors.main,
        borderRadius: BORDER_RADIUS
    },
    loginTxt: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    }
});
