import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, PADDING, BORDER_RADIUS } from '../common';
import i18n from '../i18n';
import { endRide, setCurrentRideId } from '../actions';
import { getCurrentRideId } from '../selectors';
import { Stopwatch } from 'react-native-stopwatch-timer';
import get from 'lodash/get';
import { Actions } from 'react-native-router-flux';
import { getCurrentRide } from '../selectors/userSelectors';
export class RideScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riding: true,
            showSummary: false
        };
    }

    endRide = () => {
        const { endRide, ride_id } = this.props;
        endRide({
            trip_id: ride_id
        }).then((action) => {
            if (action.success) {
                this.setState({
                    riding: false,
                    showSummary: true
                });
            }
        });
    };

    goBack = () => {
        const { setCurrentRideId } = this.props;
        this.setState({
            showSummary: false
        });
        Actions.pop();
        setCurrentRideId(null);
    };

    render() {
        const { riding, showSummary } = this.state;
        const { ride } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.riding}>{i18n.t('riding')}</Text>
                    <Stopwatch start={riding} options={timerOptions} />
                </View>
                <TouchableOpacity style={styles.ride} onPress={this.endRide}>
                    <Text style={styles.rideTxt}>{i18n.t('end_ride')}</Text>
                </TouchableOpacity>
                <Modal visible={showSummary} animationType={'fade'}>
                    <View style={styles.modal}>
                        <View style={styles.summary}>
                            <Text style={styles.riding}>{i18n.t('ride_summary')}</Text>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>{i18n.t('start_time')}</Text>
                                <Text style={styles.rowBody}>
                                    {new Date(get(ride, 'start_time')).toLocaleTimeString()}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>{i18n.t('end_time')}</Text>
                                <Text style={styles.rowBody}>
                                    {new Date(get(ride, 'end_time')).toLocaleTimeString()}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>{i18n.t('time')}</Text>
                                <Text style={styles.rowBody}>
                                    {get(ride, 'display_time_taken')}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.rowTitle}>{i18n.t('cost')}</Text>
                                <Text style={styles.rowBody}>{get(ride, 'cost')}</Text>
                            </View>
                            <TouchableOpacity style={styles.backHome} onPress={this.goBack}>
                                <Text style={styles.rideTxt}>{i18n.t('back_to_home')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state, props) => ({
    ride_id: getCurrentRideId(state),
    ride: getCurrentRide(state, props)
});

const mapDispatchToProps = {
    endRide,
    setCurrentRideId
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
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ride: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.main
    },
    backHome: {
        width: '100%',
        height: 50,
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.main
    },
    rideTxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    riding: {
        fontSize: 24,
        textAlign: 'center'
    },
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.colorWithAlpha('black', 0.24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    summary: {
        width: '90%',
        height: '40%',
        backgroundColor: colors.background,
        borderRadius: BORDER_RADIUS,
        padding: PADDING,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    rowBody: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.main
    }
});

const timerOptions = StyleSheet.create({
    container: {
        padding: PADDING,
        width: '100%'
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.main
    }
});
