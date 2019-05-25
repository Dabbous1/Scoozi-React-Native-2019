import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { WelcomeScene, LoginScene } from './scenes';
import { SafeAreaView } from 'react-navigation';
import { colors } from './common';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { persistStore } from 'redux-persist';
import { ScooziApiService } from './services';
import { getPublicAccessToken } from './actions';
import { getPublicToken } from './selectors';
import i18n from './i18n';

ScooziApiService.setStore(store);

const TopBar = () => <StatusBar barStyle={'light-content'} backgroundColor={colors.main} />;
export default class App extends Component {
    state = {
        ready: false
    };

    componentDidMount() {
        persistStore(store, {}, this.onStart);
    }

    onStart = () => {
        const accessToken = getPublicToken(store.getState());
        Promise.all([!accessToken && store.dispatch(getPublicAccessToken())]).then(() => {
            this.setState({ ready: true });
        });
    };

    render() {
        const { ready } = this.state;
        return (
            <SafeAreaView style={styles.safeArea}>
                <TopBar />
                {ready ? (
                    <Provider store={store}>
                        <Router backAndroidHandler={() => {}}>
                            <Stack
                                key={'root'}
                                navigationBarStyle={styles.navBar}
                                titleStyle={styles.title}>
                                <Scene key={'welcome'} hideNavBar component={WelcomeScene} />
                                <Scene
                                    key={'login'}
                                    component={LoginScene}
                                    title={i18n.t('login')}
                                />
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
        backgroundColor: colors.main
    },
    navBar: {
        backgroundColor: colors.main
    },
    title: {
        color: colors.white
    }
});
