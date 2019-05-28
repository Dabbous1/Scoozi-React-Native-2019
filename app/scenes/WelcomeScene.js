import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import i18n from '../i18n';
import colors from '../common/colors';
import { PADDING, BORDER_RADIUS } from '../common/styles';
import { Actions } from 'react-native-router-flux';

const MainButton = (props) => (
    <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <Text style={styles.btnTxt}>{props.title}</Text>
    </TouchableOpacity>
);
export default class WelcomeScene extends Component {
    navigateToLogin = () => {
        Actions.login();
    };

    navigateToRegister = () => {
        Actions.register();
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{i18n.t('scoozi')}</Text>
                <Text style={styles.instructions}>{i18n.t('reinventing_urban_mobility')}</Text>
                <MainButton onPress={this.navigateToLogin} title={i18n.t('login')} />
                <MainButton onPress={this.navigateToRegister} title={i18n.t('register')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: PADDING
    },
    title: {
        fontSize: 100,
        fontWeight: 'bold',
        color: colors.main
    },
    instructions: {
        fontSize: 18,
        color: colors.main
    },
    btn: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.main,
        padding: PADDING,
        borderRadius: BORDER_RADIUS
    },
    btnTxt: {
        fontSize: 28,
        color: colors.white
    }
});
