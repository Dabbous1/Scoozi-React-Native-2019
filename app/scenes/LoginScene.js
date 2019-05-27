import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../common/colors';
import { PADDING, BORDER_RADIUS } from '../common';
import { logUserIn, signInWithFacebook } from '../actions';
import i18n from '../i18n';
import { makeIsOperationLoading, makeGetOperationError } from '../selectors';
import { LoadingView, InputText } from '../components';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

    openRegister = () => {
        Actions.register({
            backTitle: i18n.t('login')
        });
    };

    signInWithFacebook = () => {
        const { signInWithFacebook } = this.props;
        signInWithFacebook();
    };
    render() {
        const { isLoading, errors } = this.props;

        return (
            <LoadingView isLoading={isLoading} containerStyle={styles.container}>
                <Text style={styles.title}>{i18n.t('sign_in_manually')}</Text>
                <InputText
                    ref={(ref) => (this.login = ref)}
                    placeholder={i18n.t('username_or_email')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setLogin}
                    returnKeyLabel={i18n.t('next')}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.password.focus()}
                />
                <InputText
                    ref={(ref) => (this.password = ref)}
                    placeholder={i18n.t('password')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setPassword}
                    secureTextEntry
                    returnKeyLabel={i18n.t('done')}
                    returnKeyType={'done'}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    textContentType={'password'}
                    autoCompleteType={'password'}
                />
                {errors ? <Text style={styles.error}>{errors && errors.error}</Text> : null}
                <TouchableOpacity style={styles.login} onPress={this.logUserIn}>
                    <Text style={styles.loginTxt}>{i18n.t('login').toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this.openRegister}>
                        <Text style={styles.register}>{i18n.t('register_now')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.forgot}>|</Text>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>{i18n.t('forgot_password')}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.row, styles.fbLogin]}
                    onPress={this.signInWithFacebook}>
                    <Icon name={'facebook'} size={20} color={colors.white} />
                    <Text style={styles.loginTxt}>{i18n.t('login_with_facebook')}</Text>
                    <View />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row, styles.gpLogin]}>
                    <Icon name={'google'} size={20} color={colors.white} />
                    <Text style={styles.loginTxt}>{i18n.t('login_with_google')}</Text>
                    <View />
                </TouchableOpacity>
            </LoadingView>
        );
    }
}

const makeMapStateToProps = () => {
    const getIsLoading = makeIsOperationLoading();
    const getErrors = makeGetOperationError();
    const mapStateToProps = (state) => ({
        isLoading: getIsLoading(state, { operation_name: 'logUserIn' }),
        errors: getErrors(state, { operation_name: 'logUserIn' })
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    logUserIn,
    signInWithFacebook
};

export default connect(
    makeMapStateToProps,
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
    error: {
        fontWeight: 'bold',
        color: colors.error,
        fontSize: 16
    },
    textInput: {
        width: '75%',
        height: 50,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.white,
        paddingHorizontal: PADDING,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: colors.gray
    },
    login: {
        padding: PADDING,
        backgroundColor: colors.main,
        borderRadius: BORDER_RADIUS,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginTxt: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%'
    },
    register: {
        color: colors.main,
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgot: {
        color: colors.darkGray,
        fontSize: 16,
        fontWeight: 'bold'
    },
    fbLogin: {
        backgroundColor: colors.facebook,
        padding: PADDING,
        borderRadius: BORDER_RADIUS
    },
    gpLogin: {
        backgroundColor: colors.google,
        padding: PADDING,
        borderRadius: BORDER_RADIUS
    }
});
