import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Router, Scene, Stack, Drawer } from 'react-native-router-flux';
import { WelcomeScene, LoginScene, RegisterScene, HomeScene, RideScene } from './scenes';
import { SafeAreaView } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { persistStore } from 'redux-persist';
import { ScooziApiService } from './services';
import { getPublicAccessToken } from './actions';
import { getPublicToken, getPrivateToken } from './selectors';
import i18n from './i18n';
import { colors } from './common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        const signedIn = getPrivateToken(store.getState());
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
                                <Drawer
                                    initial={signedIn}
                                    key={'sideMenu'}
                                    hideNavBar
                                    drawerIcon={
                                        <Icon name={'menu'} size={28} color={colors.white} />
                                    }>
                                    <Scene
                                        key={'home'}
                                        initial
                                        component={HomeScene}
                                        title={i18n.t('scoozi')}
                                    />
                                    <Scene
                                        key={'ride'}
                                        component={RideScene}
                                        title={i18n.t('ride')}
                                        hideNavBar
                                    />
                                </Drawer>
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
