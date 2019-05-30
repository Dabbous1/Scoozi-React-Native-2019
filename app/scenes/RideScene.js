import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, PADDING } from '../common';
import i18n from '../i18n';
import { endRide } from '../actions';
import { getCurrentRideId } from '../selectors/userSelectors';
export class RideScene extends Component {
    static propTypes = {
        prop: PropTypes
    };

    endRide = () => {
        const { endRide, rideId } = this.props;
        endRide({
            trip_id: rideId
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} />
                <TouchableOpacity style={styles.ride} onPress={this.endRide}>
                    <Text style={styles.rideTxt}>{i18n.t('end_ride')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    rideId: getCurrentRideId(state)
});

const mapDispatchToProps = {
    endRide
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RideScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        padding: PADDING
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
