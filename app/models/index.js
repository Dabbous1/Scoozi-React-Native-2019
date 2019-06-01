import { schema } from 'normalizr';

const RideSchema = new schema.Entity('rides');

export const schemas = {
    ride: RideSchema,
    rides: new schema.Array(RideSchema)
};
