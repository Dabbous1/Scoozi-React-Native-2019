import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import colors from '../common/colors';
import i18n from '../i18n';
export class HomeScene extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.ride}>
                    <Text style={styles.rideTxt}>{i18n.t('ride')}</Text>
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
