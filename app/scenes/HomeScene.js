import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import colors from '../common/colors';
import i18n from '../i18n';
import { startRide } from '../actions';
import { makeIsOperationLoading } from '../selectors';
import { LoadingView } from '../components';
export class HomeScene extends Component {
    static propTypes = {
        prop: PropTypes
    };

    startRide = () => {
        const { startRide } = this.props;
        startRide();
    };
    render() {
        const { isLoading } = this.props;
        return (
            <LoadingView isLoading={isLoading} containerStyle={styles.container}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 30.0609,
                            longitude: 31.2197,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                        zoomControlEnabled
                        zoomEnabled
                    />
                </View>
                <TouchableOpacity style={styles.ride} onPress={this.startRide}>
                    <Text style={styles.rideTxt}>{i18n.t('ride')}</Text>
                </TouchableOpacity>
            </LoadingView>
        );
    }
}
const makeMapStateToProps = () => {
    const getIsLoading = makeIsOperationLoading();
    const mapStateToProps = (state) => ({
        isLoading: getIsLoading(state, { operation_name: 'startRide' })
    });
    return mapStateToProps;
};

const mapDispatchToProps = {
    startRide
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(HomeScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    ride: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.main
    },
    rideTxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
});
