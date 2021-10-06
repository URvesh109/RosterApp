import {ApiResponse} from 'apisauce';
import {Api} from './api';
import {GetEventsResult} from './api.types';
import {getGeneralApiProblem} from './api-problem';
import {Event} from '../../models/event/event';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export class EventApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getEvents(): Promise<GetEventsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        '/wp-content/uploads/dummy-response.json',
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }

      const convertEvent = raw => {
        return {
          id: uuidv4(),
          flight_nr: raw?.Flightnr || '',
          date: raw?.Date || '',
          aircraft_type: raw['Aircraft Type'] || '',
          tail: raw?.Tail || '',
          departure: raw?.Departure || '',
          destination: raw?.Destination || '',
          time_depart: raw?.Time_Depart || '',
          time_arrival: raw?.Time_Arrive || '',
          duty_id: raw?.DutyID || '',
          duty_code: raw?.DutyCode || '',
          captain: raw?.Captain || '',
          first_officer: raw['First Officer'] || '',
          flight_attendant: raw['Flight Attendant'] || '',
        };
      };

      const filterEvent = (data: Event) => {
        let checkStatus = false;
        for (const property in data) {
          if (property !== 'id' && data[`${property}`]) {
            checkStatus = true;
          }
        }
        return checkStatus;
      };

      const rawUsers = response.data;
      const resultEvents: Event[] = rawUsers.map(convertEvent);
      const filterEvents: Event[] = resultEvents.filter(filterEvent);
      return {kind: 'ok', events: filterEvents};
    } catch (e) {
      return {kind: 'bad-data'};
    }
  }
}
