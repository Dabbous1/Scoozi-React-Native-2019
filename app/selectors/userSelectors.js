import { createSelector } from 'reselect';

export const getEntities = (state) => state.entities;
export const getRides = createSelector(
    getEntities,
    (entities) => entities.rides
);
export const getPublicToken = (state) => state.publicAccessToken;
export const getPrivateToken = (state) => state.privateAccessToken;
export const getCurrentRideId = (state) => state.currentRideId;

export const getCurrentRide = createSelector(
    getCurrentRideId,
    getRides,
    (ride_id, rides) => rides && ride_id && rides[ride_id]
);
