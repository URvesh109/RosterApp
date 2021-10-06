import {GeneralApiProblem} from './api-problem';
import {Event} from '../../models/event/event';

// export interface Event {
//   flight_nr: string;
//   date: string;
//   aircrafty_type: string;
//   departure: string;
//   destination: string;
//   time_depart: string;
//   duty_id: string;
//   duty_code: string;
//   captain: string;
//   first_officer: string;
//   flight_attendant: string;
// }

export type GetEventsResult = {kind: 'ok'; events: Event[]} | GeneralApiProblem;
export type GetEventResult = {kind: 'ok'; event: Event} | GeneralApiProblem;
