import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { WelcomeScene, LoginScene, RegisterScene } from './scenes';
import { SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { persistStore } from 'redux-persist';
import { ScooziApiService } from './services';
import { getPublicAccessToken } from './actions';
import { getPublicToken } from './selectors';
import i18n from './i18n';
import { PADDING, colors } from './common';

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
            <SafeAreaView style={styles.safeArea} forceInset={{ top: 'never' }}>
                <TopBar />
                {ready ? (
                    <Provider store={store}>
                        <Router backAndroidHandler={() => {}}>
                            <Stack
                                key={'root'}
                                navigationBarStyle={styles.navBar}
                                backTitle={i18n.t('back')}
                                backButtonTextStyle={styles.title}
                                backButtonTintColor={colors.white}
                                titleStyle={styles.title}>
                                <Scene key={'welcome'} hideNavBar component={WelcomeScene} />
                                <Scene
                                    key={'login'}
                                    component={LoginScene}
                                    title={i18n.t('login')}
                                />
                                <Scene
                                    key={'register'}
                                    component={RegisterScene}
                                    title={i18n.t('registration')}
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
        backgroundColor: colors.main,
        paddingHorizontal: PADDING
    },
    title: {
        color: colors.white
    }
});
