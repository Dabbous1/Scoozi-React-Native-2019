import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '../common';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loaderStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default class LoadingView extends Component {
    static propTypes = {
        containerStyle: PropTypes.object,
        children: PropTypes.element.isRequired,
        isLoading: PropTypes.bool.isRequired,
        backgroundColor: PropTypes.string,
        text: PropTypes.string,
        textStyle: PropTypes.object,
        loaderStyle: PropTypes.object
    };

    static defaultProps = {
        containerStyle: styles.container,
        children: null,
        isLoading: false,
        backgroundColor: colors.background,
        text: null,
        textStyle: null,
        loaderStyle: styles.loaderStyle
    };

    renderLoader() {
        const { backgroundColor, text, textStyle, loaderStyle } = this.props;
        return (
            <View style={[StyleSheet.absoluteFill, loaderStyle, { backgroundColor }]}>
                <ActivityIndicator color={colors.main} size={'large'} animating />
                <Text style={textStyle}>{text}</Text>
            </View>
        );
    }

    render() {
        const { containerStyle, children, isLoading } = this.props;
        return (
            <View style={containerStyle}>
                {children}
                {isLoading && this.renderLoader()}
            </View>
        );
    }
}
