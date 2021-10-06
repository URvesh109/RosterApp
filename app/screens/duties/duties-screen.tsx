import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  ViewStyle,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, COMMON_STYLES, SPACING} from '../../theme';
import {LoadingIndicator, EmptyList, ListComponent} from '../../components';
import {DutyNavigatorParamList} from '../../navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../models';

const WIDTH_IN_PER = (value: number) => {
  return {
    width: `${value}%`,
  };
};

const LIST_TITLE: ViewStyle = {
  height: 35,
  justifyContent: 'center',
  backgroundColor: COLORS.grey,
};

const SEPERATOR_STYLE: ViewStyle = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: COLORS.lightGrey,
};

const TOUCHABLE_VIEW: ViewStyle = {
  height: 55,
  padding: SPACING.large,
  flexDirection: 'row',
};

type NameValueProp = {
  name: string;
  value: string;
};

const NameValueComponent: FC<NameValueProp> = ({name, value}) => {
  const firstColumnWidth = WIDTH_IN_PER(35);
  const secondColumnWidth = WIDTH_IN_PER(5);
  const thirdColumnWidth = WIDTH_IN_PER(60);
  return (
    <View style={COMMON_STYLES.row}>
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

type EvenTitle = {
  listTitle: string;
};

const EventTitle: FC<EvenTitle> = props => {
  const {listTitle} = props;
  return (
    <View style={COMMON_STYLES.card}>
      <View style={LIST_TITLE}>
        <Text style={[COMMON_STYLES.label, {fontWeight: 'bold'}]}>
          {listTitle}
        </Text>
      </View>
    </View>
  );
};

type SingleEventProp = {
  listTitle: string;
  eventValue: string;
};

const SingleEvent: FC<SingleEventProp> = props => {
  const {listTitle, eventValue} = props;
  return (
    <View style={COMMON_STYLES.card}>
      <View style={LIST_TITLE}>
        <NameValueComponent name={listTitle} value={eventValue} />
      </View>
    </View>
  );
};

type EvenListProp = {
  title: string;
  data?: Event[];
  eventValue?: string;
  showContent: boolean;
};

const SelectEventComponent: FC<EvenListProp> = props => {
  const {title, data, eventValue, showContent} = props;

  if (!showContent) {
    return null;
  }

  if (eventValue) {
    return <SingleEvent listTitle={title} eventValue={eventValue} />;
  } else if (data?.length) {
    return <EventTitle listTitle={title} />;
  } else {
    return null;
  }
};

export const DutiesScreen: FC<
  StackScreenProps<DutyNavigatorParamList, 'eventDetails'>
> = observer(({navigation}) => {
  const {eventStore} = useStores();
  const {isLoading, pullToRefresh, pullToRefreshIndicator, todayRoster} =
    eventStore;
  const navigateToEventDetails = id => {
    navigation.navigate('eventDetails', {id});
  };
  useEffect(() => {
    async function fetchData() {
      await eventStore.getEvents();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <LoadingIndicator />;
  }

  console.log('Tod', todayRoster);

  return (
    <View style={COMMON_STYLES.full}>
      <SectionList
        sections={todayRoster}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigateToEventDetails(item.id)}
            style={TOUCHABLE_VIEW}>
            <ListComponent dutyCode={item.duty_code} eventObj={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={SEPERATOR_STYLE} />}
        ListEmptyComponent={
          <EmptyList message="No event found for tdoay's date" />
        }
        renderSectionHeader={({
          section: {title, data, eventValue, showContent},
        }) => (
          <SelectEventComponent
            title={title}
            data={data}
            eventValue={eventValue}
            showContent={showContent}
          />
        )}
        onRefresh={pullToRefresh}
        refreshing={pullToRefreshIndicator}
      />
    </View>
  );
});
