import React, {FC} from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {COLORS, SPACING, COMMON_STYLES} from '../../theme';
import {LoadingIndicator, NoInternet} from '../../components';
import {useNetInfo} from '../../hooks';

const CARD_VIEW: ViewStyle = {
  marginTop: 10,
  width: '100%',
  borderRadius: SPACING.large,
  backgroundColor: COLORS.grey,
  padding: SPACING.large,
  shadowColor: COLORS.grey,
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 1,
  shadowRadius: 8,
  justifyContent: 'space-between',
};

const ROW: ViewStyle = {
  flexDirection: 'row',
};

const WIDTH_5: ViewStyle = {
  width: '5%',
};

const WIDTH_IN_PER = (value: number) => {
  return {
    width: `${value}%`,
  };
};

const WIDTH_10: ViewStyle = {
  width: '10%',
};

const WIDTH_35: ViewStyle = {
  width: '35%',
};

const WIDTH_40: ViewStyle = {
  width: '40%',
};

const WIDTH_50: ViewStyle = {
  width: '50%',
};

const WIDTH_55: ViewStyle = {
  width: '55%',
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
  const mainStyle = [ROW];
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
    <View style={ROW}>
      <NameValueComponent name={name1} value={value1} isDoubleValue />
      <NameValueComponent name={name2} value={value2} isDoubleValue />
    </View>
  );
};

export const EventDetailsScreen = () => {
  const loading = false;
  const isOnline = useNetInfo();
  if (!isOnline) {
    return <NoInternet />;
  } else if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={COMMON_STYLES.full}>
      <View style={CARD_VIEW}>
        <NamesValuesComponent
          name1="FlightNr"
          value1="MX78"
          name2="Tail"
          value2="9878"
        />
        <NamesValuesComponent
          name1="Departure"
          value1="AMS"
          name2="Destination"
          value2="ALC"
        />
        <NamesValuesComponent
          name1="Time Depart"
          value1="11:35"
          name2="Time Arrive"
          value2="14: 35"
        />
        <NameValueComponent name="Aircraft Type" value="784-800E" />
        <NameValueComponent name="Captain" value="Richard Versluis" />
        <NameValueComponent name="First Officer" value="Jeroen Derwort" />
        <NameValueComponent name="Flight Attendant" value="Lucy Stone" />
      </View>
    </View>
  );
};
