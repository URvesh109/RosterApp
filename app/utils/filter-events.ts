import {Event} from '../models/event/event';
import {KEYS} from './constant';
import moment from 'moment';

const currentDate = moment().format('DD/MM/YYYY');

function filterDayOffEvent(events: Event[]) {
  let dayOffEvents = events.filter(data => {
    let status = false;
    if (currentDate === data.date) {
      if (data.duty_code.toLowerCase() === KEYS.DAYOFF) {
        status = true;
      }
    }
    return status;
  });
  return dayOffEvents;
}

function filterReportingEvent(events: Event[]) {
  let reportEvents = events.filter(data => {
    let status = false;
    if (
      data.aircraft_type &&
      data.captain &&
      currentDate === data.date &&
      data.departure &&
      data.destination &&
      data.duty_code.toLowerCase() === KEYS.FLIGHT &&
      data.duty_id &&
      data.first_officer &&
      data.flight_attendant &&
      data.flight_nr &&
      data.tail &&
      data.time_arrival &&
      data.time_depart
    ) {
      status = true;
    }
    return status;
  });
  console.log('reportEvents', reportEvents);

  return reportEvents;
}

function filterFlightEvent(events: Event[]) {
  let flightEvents = events.filter(data => {
    let status = false;
    if (
      data.departure !== data.destination &&
      data.duty_code.toLowerCase() === KEYS.FLIGHT &&
      currentDate === data.date
    ) {
      if (
        !data.aircraft_type ||
        !data.captain ||
        !data.first_officer ||
        !data.flight_attendant ||
        !data.flight_nr ||
        !data.tail
      ) {
        status = true;
      }
    }
    return status;
  });
  return flightEvents;
}

function filterLayoverEvent(events: Event[]) {
  let layoverEvents = events.filter(data => {
    let status = false;
    if (
      currentDate === data.date &&
      data.duty_code.toLowerCase() === KEYS.LAYOVER
    ) {
      status = true;
    }
    return status;
  });
  return layoverEvents;
}

function filterTrainingEvent(events: Event[]) {
  let flightEvents = events.filter(data => {
    let status = false;
    if (
      currentDate === data.date &&
      data.departure === data.destination &&
      data.duty_code.toLowerCase() === KEYS.FLIGHT
    ) {
      status = true;
    }
    return status;
  });
  return flightEvents;
}

function filterStandByEvent(events: Event[]) {
  let standByEvents = events.filter(data => {
    let status = false;
    if (
      currentDate === data.date &&
      data.duty_code.toLowerCase() === KEYS.STANDBY
    ) {
      status = true;
    }
    return status;
  });
  return standByEvents;
}

export function getTodayDutiesRoster(events: Event[]) {
  let dayOffEvents: Event[] = filterDayOffEvent(events);
  let reportEvents: Event[] = filterReportingEvent(events);
  let flightEvents: Event[] = filterFlightEvent(events);
  let trainingEvents: Event[] = filterTrainingEvent(events);
  let layoverEvents: Event[] = filterLayoverEvent(events);
  let standbyEvents: Event[] = filterStandByEvent(events);
  const DAY_OFF_STATUS = !!dayOffEvents.length;
  const reportCount = reportEvents.length;
  const debrief_Event = reportCount ? reportEvents[reportCount - 1] : '';
  const todayDuties = [];

  const dayOffObj = {
    title: 'Day Off',
    id: 1,
    showContent: DAY_OFF_STATUS,
    eventValue: 'No Work today',
    data: [],
  };

  if (DAY_OFF_STATUS) {
    todayDuties.push(dayOffObj);
  }

  const reportEventObj = {
    title: 'Report Event',
    id: 2,
    showContent: !DAY_OFF_STATUS,
    eventValue: '',
    data: DAY_OFF_STATUS ? [] : reportEvents,
  };

  if (reportEventObj.data.length) {
    todayDuties.push(reportEventObj);
  }

  const flightEventObj = {
    title: 'Flight Event',
    id: 3,
    showContent: true,
    eventValue: '',
    data: flightEvents,
  };

  if (flightEventObj.data.length) {
    todayDuties.push(flightEventObj);
  }

  const debriefEventObj = {
    title: 'Debrief Event',
    id: 4,
    showContent: !DAY_OFF_STATUS,
    eventValue: debrief_Event ? `${debrief_Event.time_arrival}` : '',
    data: [],
  };

  if (debrief_Event) {
    todayDuties.push(debriefEventObj);
  }

  const layoverEventObj = {
    title: 'Layover Event',
    id: 5,
    showContent: !DAY_OFF_STATUS,
    eventValue: '',
    data: DAY_OFF_STATUS ? [] : layoverEvents,
  };

  if (layoverEventObj.data.length) {
    todayDuties.push(layoverEventObj);
  }

  const trainingEventObj = {
    title: 'Training Course',
    id: 6,
    showContent: !DAY_OFF_STATUS,
    eventValue: '',
    data: DAY_OFF_STATUS ? [] : trainingEvents,
  };

  if (trainingEventObj.data.length) {
    todayDuties.push(trainingEventObj);
  }

  const standbyObj = {
    title: 'Standby Event',
    id: 7,
    showContent: !DAY_OFF_STATUS,
    eventValue: '',
    data: DAY_OFF_STATUS ? [] : standbyEvents,
  };

  if (standbyObj.data.length) {
    todayDuties.push(standbyObj);
  }

  return todayDuties;
}
