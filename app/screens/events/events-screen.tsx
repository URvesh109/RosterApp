import React, {FC} from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS, SPACING, COMMON_STYLES, FONT_SIZE} from '../../theme';
import {LoadingIndicator, NoInternet, EmptyList} from '../../components';
import {useNetInfo} from '../../hooks';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSuitcase, faPlane, faFile} from '@fortawesome/free-solid-svg-icons';
import {KEYS} from '../../utils';
import {NavigatorParamList} from '../../navigator';
import {StackScreenProps} from '@react-navigation/stack';

const SECTION_VIEW: ViewStyle = {
  height: 35,
  backgroundColor: COLORS.grey,
  justifyContent: 'center',
  paddingLeft: SPACING.large,
};

const SECTION_TITLE: TextStyle = {
  fontSize: FONT_SIZE.medium,
  fontWeight: 'bold',
  lineHeight: 15,
};

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

const WIDTH_55: ViewStyle = {
  width: '55%',
};

const HOURS_VIEW: ViewStyle = {
  width: '30%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
};

const TOUCHABLE_VIEW: ViewStyle = {
  height: 55,
  padding: SPACING.large,
  flexDirection: 'row',
};

const SEPERATOR_STYLE: ViewStyle = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: COLORS.lightGrey,
};

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

export type Props = {
  dutyCode: 'standby' | 'flight' | 'layover';
  dutyValue: string;
  id?: string;
  time: string;
};

const customStyle = [ICON_VIEW];

const ListComponent: FC<Props> = props => {
  const {dutyCode, dutyValue, id, time} = props;
  let iconName = faFile;
  let tempDutyCode = dutyCode.toLowerCase();
  let crew;
  if (tempDutyCode === KEYS.FLIGHT) {
    iconName = faPlane;
    customStyle.push({transform: [{rotate: '.45deg'}]});
  } else if (tempDutyCode === KEYS.LAYOVER) {
    iconName = faSuitcase;
  } else {
    crew = 'Match Crew';
  }

  return (
    <>
      <View style={customStyle}>
        <FontAwesomeIcon icon={iconName} size={FONT_SIZE.xxl} />
      </View>
      <View style={WIDTH_55}>
        <Text style={SUB_TITLE}>{dutyValue}</Text>
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

export const EventsScreen: FC<StackScreenProps<NavigatorParamList, 'event'>> =
  ({navigation}) => {
    const navigateToEventDetails = () => navigation.navigate('eventDetails');
    const loading = false;
    const isOnline = useNetInfo();
    if (!isOnline) {
      return <NoInternet />;
    } else if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <View style={COMMON_STYLES.full}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={navigateToEventDetails}
              style={TOUCHABLE_VIEW}>
              <ListComponent
                dutyCode="standby"
                dutyValue="Standby"
                time="93:05 horus"
                id="SBY(ATL)"
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={SEPERATOR_STYLE} />}
          ListEmptyComponent={<EmptyList message="no item found" />}
          renderSectionHeader={({section: {title}}) => (
            <View style={SECTION_VIEW}>
              <Text style={SECTION_TITLE}>mon 4th Oct, 2021 {title}</Text>
            </View>
          )}
        />
      </View>
    );
  };
