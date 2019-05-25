import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { PADDING, BORDER_RADIUS, colors } from '../common';

const styles = StyleSheet.create({
    container: {
        width: '75%'
    },
    textInput: {
        width: '100%',
        height: 50,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.white,
        paddingHorizontal: PADDING,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: colors.gray
    },
    inputError: {
        borderColor: colors.red
    },
    error: {
        color: colors.error,
        paddingTop: 4,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const InputText = React.forwardRef((props, ref) => {
    const [text, setText] = useState('');
    onChangeText = (text) => {
        setText(text);
        props.onChangeText(text);
    };
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                ref={ref}
                style={[styles.textInput, props.error ? styles.inputError : {}]}
                onChangeText={onChangeText}
            />
            {!props.hideError ? <Text style={styles.error}>{props.error}</Text> : null}
        </View>
    );
});

export default InputText;
