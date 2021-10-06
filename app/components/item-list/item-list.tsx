import React, {FC} from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import {COLORS, FONT_SIZE} from '../../theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSuitcase, faPlane, faFile} from '@fortawesome/free-solid-svg-icons';
import {KEYS, formatStandBy, layoverTime} from '../../utils';
import _ from 'lodash';
import {Event} from '../../models/event/event';

const SUB_TITLE: TextStyle = {
  fontSize: FONT_SIZE.large,
  fontWeight: 'bold',
  lineHeight: 15,
};

const SUB_LABEL: TextStyle = {
  fontSize: FONT_SIZE.medium,
};

const ICON_VIEW: ViewStyle = {
  width: '15%',
  justifyContent: 'center',
  alignItems: 'center',
};

const WIDTH_50: ViewStyle = {
  width: '50%',
};

const HOURS_VIEW: ViewStyle = {
  width: '35%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
};

type Props = {
  dutyCode: string;
  eventObj: Event;
  todayDuty?: boolean;
};

export const ListComponent: FC<Props> = props => {
  const {dutyCode, eventObj, todayDuty} = props;
  const customStyle = [ICON_VIEW];
  let iconName = faFile;
  let tempDutyCode = dutyCode.toLowerCase();
  let crew;
  let time;
  let dest_arr = _.capitalize(tempDutyCode);
  let time_depart = eventObj.time_depart;
  let time_arr = eventObj.time_arrival;
  let id = '';

  if (tempDutyCode === KEYS.FLIGHT || todayDuty) {
    iconName = faPlane;
    time = `${eventObj.time_depart} - ${eventObj.time_arrival}`;
    customStyle.push({transform: [{rotate: '-45deg'}]});
    dest_arr = `${eventObj.departure} - ${eventObj.destination}`;
  } else if (tempDutyCode === KEYS.LAYOVER) {
    time = layoverTime(time_depart, time_arr);
    iconName = faSuitcase;
    id = eventObj.destination;
  } else {
    time = formatStandBy(time_depart, time_arr);
    id = 'SBY(ATL)';
    crew = 'Match Crew';
  }

  return (
    <>
      <View style={customStyle}>
        <FontAwesomeIcon icon={iconName} size={FONT_SIZE.xxl} />
      </View>
      <View style={WIDTH_50}>
        <Text style={SUB_TITLE}>{dest_arr}</Text>
        {id ? (
          <Text style={[SUB_LABEL, {color: COLORS.lightGrey}]}>{id}</Text>
        ) : null}
      </View>
      <View style={HOURS_VIEW}>
        {crew ? (
          <Text style={[SUB_LABEL, {color: COLORS.lightGrey}]}>{crew}</Text>
        ) : null}
        <Text style={[SUB_LABEL, {color: COLORS.red}]}>{time}</Text>
      </View>
    </>
  );
};
