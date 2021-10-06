import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {EventModel, EventSnapshot} from '../event/event';
import {EventApi} from '../../services/api/event-api';
import {withEnvironment} from '../extensions/with-environment';
import _ from 'lodash';
import * as UTILS from '../../utils';

export const EventStoreModel = types
  .model('EventStore')
  .props({
    isLoading: true,
    pullToRefreshIndicator: false,
    events: types.optional(types.array(EventModel), []),
  })
  .extend(withEnvironment)
  .actions(self => ({
    saveEvents: (EventSnapshots: EventSnapshot[]) => {
      self.events.replace(EventSnapshots);
    },
    setLoadingIndicator: (status: boolean) => {
      self.isLoading = status;
    },
    setPullToRefresh: (status: boolean) => {
      self.pullToRefreshIndicator = status;
    },
  }))
  .views(self => ({
    get eventSectionList() {
      let tempEvents = self.events;

      let newEvents = tempEvents.filter(item => {
        let filterStatus = false;
        let tempDutyCode = item.duty_code.toLowerCase();
        if (
          tempDutyCode === UTILS.KEYS.FLIGHT ||
          tempDutyCode === UTILS.KEYS.LAYOVER ||
          tempDutyCode === UTILS.KEYS.STANDBY
        ) {
          filterStatus = true;
        }
        return filterStatus;
      });

      const groupedArray = _.groupBy(newEvents, 'date');

      let eventSection = [];
      for (const [key, value] of Object.entries(groupedArray)) {
        eventSection.push({
          title: key,
          data: value,
        });
      }
      return eventSection;
    },
    get todayRoster() {
      return UTILS.getTodayDutiesRoster(self.events);
    },
  }))
  .actions(self => ({
    getEvents: async () => {
      const eventApi = new EventApi(self.environment.api);
      const result = await eventApi.getEvents();
      self.setLoadingIndicator(false);
      if (result.kind === 'ok') {
        self.saveEvents(result.events);
      } else {
        console.log(result.kind);
      }
    },
  }))
  .actions(self => ({
    pullToRefresh: async () => {
      self.setPullToRefresh(true);
      const eventApi = new EventApi(self.environment.api);
      const result = await eventApi.getEvents();
      self.setPullToRefresh(false);
      if (result.kind === 'ok') {
        self.saveEvents(result.events);
      } else {
        console.log(result.kind);
      }
    },
  }));

type EventStoreType = Instance<typeof EventStoreModel>;
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>;
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
export const createEventStoreDefaultModel = () =>
  types.optional(EventStoreModel, {});
