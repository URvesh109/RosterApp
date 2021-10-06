import {Instance, SnapshotOut, types} from 'mobx-state-tree';

/**
 * Event model.
 */
export const EventModel = types.model('Event').props({
  id: types.identifier,
  flight_nr: types.maybe(types.string),
  date: types.maybe(types.string),
  aircraft_type: types.maybe(types.string),
  tail: types.maybe(types.string),
  departure: types.maybe(types.string),
  destination: types.maybe(types.string),
  time_depart: types.maybe(types.string),
  time_arrival: types.maybe(types.string),
  duty_id: types.maybe(types.string),
  duty_code: types.maybe(types.string),
  captain: types.maybe(types.string),
  first_officer: types.maybe(types.string),
  flight_attendant: types.maybe(types.string),
});

type EventType = Instance<typeof EventModel>;
export interface Event extends EventType {}
type EventSnapshotType = SnapshotOut<typeof EventModel>;
export interface EventSnapshot extends EventSnapshotType {}
export const createEventDefaultModel = () => types.optional(EventModel, {});
