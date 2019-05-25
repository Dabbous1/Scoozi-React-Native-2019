import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, PADDING, BORDER_RADIUS } from '../common';
import { LoadingView, InputText } from '../components';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class RegisterScene extends Component {
    state = {
        email: '',
        password: '',
        passwordConfirmation: '',
        mobileNumber: ''
    };

    setLogin = (login) => this.setState({ login });

    setPassword = (password) => this.setState({ password });

    setConfirmation = (passwordConfirmation) => this.setState({ passwordConfirmation });

    setMobile = (mobileNumber) => this.setState({ mobileNumber });

    render() {
        return (
            <View style={styles.container}>
                <InputText
                    ref={(ref) => (this.email = ref)}
                    placeholder={i18n.t('email')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setLogin}
                />
                <InputText
                    ref={(ref) => (this.password = ref)}
                    placeholder={i18n.t('password')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setPassword}
                />
                <InputText
                    ref={(ref) => (this.passwordConf = ref)}
                    placeholder={i18n.t('password_conf')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setConfirmation}
                />
                <InputText
                    ref={(ref) => (this.mobile = ref)}
                    placeholder={i18n.t('mobile_number')}
                    placeholderTextColor={colors.darkGray}
                    onChangeText={this.setMobile}
                />
                <TouchableOpacity style={styles.register} onPress={this.logUserIn}>
                    <Text style={styles.registerTxt}>{i18n.t('register').toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <View style={styles.line} />
                    <Text style={styles.or}>OR</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={[styles.row, styles.fbLogin]}>
                    <Icon name={'facebook'} size={20} color={colors.white} />
                    <Text style={styles.registerTxt}>{i18n.t('register_with_facebook')}</Text>
                    <View />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row, styles.gpLogin]}>
                    <Icon name={'google'} size={20} color={colors.white} />
                    <Text style={styles.registerTxt}>{i18n.t('register_with_google')}</Text>
                    <View />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
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
