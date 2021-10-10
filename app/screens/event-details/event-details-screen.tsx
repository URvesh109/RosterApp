import React, {FC} from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {COMMON_STYLES, SPACING} from '../../theme';
import {LoadingIndicator} from '../../components';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../models';
import {NavigatorParamList} from '../../navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {KEYS, formatStandByForEventDetails} from '../../utils';

const WIDTH_IN_PER = (value: number) => {
  return {
    width: `${value}%`,
  };
};

const PADDING: ViewStyle = {
  paddingVertical: SPACING.medium,
};

type NameValueProp = {
  name: string;
  value: string;
  isDoubleValue?: boolean;
};

const NameValueComponent: FC<NameValueProp> = ({
  name,
  value,
  isDoubleValue,
}) => {
  const firstColumnWidth = isDoubleValue ? WIDTH_IN_PER(55) : WIDTH_IN_PER(40);
  const secondColumnWidth = isDoubleValue ? WIDTH_IN_PER(10) : WIDTH_IN_PER(5);
  const thirdColumnWidth = isDoubleValue ? WIDTH_IN_PER(35) : WIDTH_IN_PER(55);
  const mainStyle: any = [COMMON_STYLES.row, PADDING];
  if (isDoubleValue) {
    mainStyle.push(WIDTH_IN_PER(50));
  }
  return (
    <View style={mainStyle}>
      <View style={firstColumnWidth}>
        <Text style={[COMMON_STYLES.label, {fontWeight: 'bold'}]}>{name}</Text>
      </View>
      <View style={secondColumnWidth}>
        <Text style={COMMON_STYLES.label}>:</Text>
      </View>
      <View style={thirdColumnWidth}>
        <Text style={COMMON_STYLES.label}>{value}</Text>
      </View>
    </View>
  );
};

type NamesValuesProps = {
  name1: string;
  value1: string;
  name2: string;
  value2: string;
};

const NamesValuesComponent: FC<NamesValuesProps> = props => {
  const {name1, name2, value1, value2} = props;
  return (
    <View style={COMMON_STYLES.row}>
      <NameValueComponent name={name1} value={value1} isDoubleValue />
      <NameValueComponent name={name2} value={value2} isDoubleValue />
    </View>
  );
};

export const EventDetailsScreen: FC<
  StackScreenProps<NavigatorParamList, 'eventDetails'>
> = observer(({route}) => {
  const {id} = route.params;
  const loading = false;
  const {eventStore} = useStores();
  const {events} = eventStore;

  const selectedEvent = events.filter(item => item.id === id)[0];
  let depart = selectedEvent.time_depart;
  let arrive = selectedEvent.time_arrival;

  if (selectedEvent.duty_code.toLowerCase() === KEYS.STANDBY) {
    let depArr = formatStandByForEventDetails(depart, arrive);
    depart = depArr.depart_time;
    arrive = depArr.arr_time;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={COMMON_STYLES.full}>
      <View style={COMMON_STYLES.card}>
        <NamesValuesComponent
          name1="FlightNr"
          value1={selectedEvent.flight_nr}
          name2="Tail"
          value2={selectedEvent.tail}
        />
        <NamesValuesComponent
          name1="Departure"
          value1={selectedEvent.departure}
          name2="Destination"
          value2={selectedEvent.destination}
        />
        <NamesValuesComponent
          name1="Time Depart"
          value1={depart}
          name2="Time Arrive"
          value2={arrive}
        />
        <NameValueComponent
          name="Aircraft Type"
          value={selectedEvent.aircraft_type}
        />
        <NameValueComponent name="Captain" value={selectedEvent.captain} />
        <NameValueComponent
          name="First Officer"
          value={selectedEvent.first_officer}
        />
        <NameValueComponent
          name="Flight Attendant"
          value={selectedEvent.flight_attendant}
        />
      </View>
    </View>
  );
});
