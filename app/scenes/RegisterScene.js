import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, PADDING, BORDER_RADIUS } from '../common';
import { LoadingView, InputText } from '../components';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { registerUser, signInWithFacebook } from '../actions';
import { makeIsOperationLoading, makeGetOperationError } from '../selectors';
import get from 'lodash/get';
export class RegisterScene extends Component {
    state = {
        email: '',
        password: '',
        mobile_number: ''
    };

    setEmail = (email) => this.setState({ email });

    setPassword = (password) => this.setState({ password });

    setMobile = (mobile_number) => this.setState({ mobile_number });

    register = () => {
        const { registerUser } = this.props;
        const { email, password, mobile_number } = this.state;
        registerUser({
            user: {
                email,
                password,
                password_confirmation: password,
                mobile_number
            }
        });
    };

    signUpWithFacebook = () => {
        const { signInWithFacebook } = this.props;
        signInWithFacebook();
    };

    render() {
        const { isLoading, isSigning, errors } = this.props;
        const userErrors = get(errors, 'errors');
        return (
            <LoadingView isLoading={isLoading || isSigning} containerStyle={styles.container}>
                <InputText
                    ref={(ref) => (this.email = ref)}
                    placeholder={i18n.t('email')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setEmail}
                    error={get(userErrors, 'email[0]')}
                    onSubmitEditing={() => this.password.focus()}
                    returnKeyLabel={i18n.t('next')}
                    returnKeyType={'next'}
                    textContentType={'emailAddress'}
                    keyboardType={'email-address'}
                    autoCompleteType={'email'}
                />
                <InputText
                    ref={(ref) => (this.password = ref)}
                    placeholder={i18n.t('password')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setPassword}
                    error={get(userErrors, 'password[0]')}
                    onSubmitEditing={() => this.mobile.focus()}
                    secureTextEntry
                    returnKeyLabel={i18n.t('next')}
                    returnKeyType={'next'}
                    textContentType={'password'}
                    autoCompleteType={'password'}
                />
                <InputText
                    ref={(ref) => (this.mobile = ref)}
                    placeholder={i18n.t('mobile_number')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setMobile}
                    error={get(userErrors, 'mobile_number[0]')}
                    returnKeyLabel={i18n.t('done')}
                    returnKeyType={'done'}
                    keyboardType={'phone-pad'}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    maxLength={11}
                    textContentType={'telephoneNumber'}
                    autoCompleteType={'tel'}
                />
                <TouchableOpacity style={styles.register} onPress={this.register}>
                    <Text style={styles.registerTxt}>{i18n.t('register').toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <View style={styles.line} />
                    <Text style={styles.or}>OR</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity
                    style={[styles.row, styles.fbLogin]}
                    onPress={this.signUpWithFacebook}>
                    <Icon name={'facebook'} size={20} color={colors.white} />
                    <Text style={styles.registerTxt}>{i18n.t('register_with_facebook')}</Text>
                    <View />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row, styles.gpLogin]}>
                    <Icon name={'google'} size={20} color={colors.white} />
                    <Text style={styles.registerTxt}>{i18n.t('register_with_google')}</Text>
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
        isLoading: getIsLoading(state, { operation_name: 'registerUser' }),
        isSigning: getIsLoading(state, { operation_name: 'logUserIn' }),
        errors: getErrors(state, { operation_name: 'registerUser' })
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    registerUser,
    signInWithFacebook
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(RegisterScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: PADDING
    },
    register: {
        padding: PADDING,
        backgroundColor: colors.main,
        borderRadius: BORDER_RADIUS,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerTxt: {
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
    fbLogin: {
        backgroundColor: colors.facebook,
        padding: PADDING,
        borderRadius: BORDER_RADIUS
    },
    gpLogin: {
        backgroundColor: colors.google,
        padding: PADDING,
        borderRadius: BORDER_RADIUS
    },
    or: {
        color: colors.darkGray,
        fontWeight: 'bold'
    },
    line: {
        height: 1,
        backgroundColor: colors.darkGray,
        width: '40%'
    }
});
