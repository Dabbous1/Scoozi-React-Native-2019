import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { WelcomeScene } from './scenes';
import { SafeAreaView } from 'react-navigation';
import { colors } from './common';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { persistStore } from 'redux-persist';

const TopBar = () => <StatusBar barStyle={'light-content'} backgroundColor={colors.statusBar} />;
export default class App extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        persistStore(store, {}, this.onStart);
    }

    onStart = () => {
        this.setState({ ready: true });
    };

    render() {
        const { ready } = this.state;
        return (
            <SafeAreaView style={styles.safeArea}>
                <TopBar />
                {ready ? (
                    <Provider store={store}>
                        <Router backAndroidHandler={() => {}}>
                            <Stack hideNavBar key={'root'}>
                                <Scene key={'welcome'} component={WelcomeScene} />
                            </Stack>
                        </Router>
                    </Provider>
                ) : (
                    <View />
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.statusBar
    }
});
