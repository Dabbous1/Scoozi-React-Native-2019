import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { PADDING, BORDER_RADIUS, colors } from '../common';

const styles = StyleSheet.create({
    textInput: {
        width: '75%',
        height: 50,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.white,
        paddingHorizontal: PADDING,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: colors.gray
    }
});

const InputText = React.forwardRef((props, ref) => {
    const [text, setText] = useState('');
    onChangeText = (text) => {
        setText(text);
        props.onChangeText(text);
    };
    return <TextInput {...props} ref={ref} style={styles.textInput} onChangeText={onChangeText} />;
});

export default InputText;
