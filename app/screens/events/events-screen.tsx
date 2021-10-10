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
import {COLORS, COMMON_STYLES, FONT_SIZE} from '../../theme';
import {LoadingIndicator, EmptyList, ListComponent} from '../../components';
import {dateFormatting} from '../../utils';
import {NavigatorParamList} from '../../navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../models';
import {Event} from '../../models/event/event';

const SECTION_VIEW: ViewStyle = {
  backgroundColor: COLORS.grey,
  justifyContent: 'center',
};

const SECTION_TITLE: TextStyle = {
  fontSize: FONT_SIZE.xl,
  fontWeight: 'bold',
  color: COLORS.black,
};

const SEPERATOR_STYLE: ViewStyle = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: COLORS.lightGrey,
};

type SectionTitleProps = {
  title: string;
  data: Event[];
};

const SectionTitleComponent: FC<SectionTitleProps> = props => {
  const {title, data} = props;
  let modifyTitle = dateFormatting(title);
  if (!data.length) {
    return null;
  }

  return (
    <View style={COMMON_STYLES.card}>
      <Text style={SECTION_TITLE}>{modifyTitle}</Text>
    </View>
  );
};

export const EventsScreen: FC<StackScreenProps<NavigatorParamList, 'event'>> =
  observer(({navigation}) => {
    const navigateToEventDetails = id => {
      navigation.navigate('eventDetails', {id});
    };
    const {eventStore} = useStores();
    const {eventSectionList, isLoading, pullToRefresh} = eventStore;
    if (isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <View style={COMMON_STYLES.full}>
        <SectionList
          sections={eventSectionList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigateToEventDetails(item.id)}>
              <ListComponent dutyCode={item.duty_code} eventObj={item} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={SEPERATOR_STYLE} />}
          ListEmptyComponent={<EmptyList message="no item found" />}
          renderSectionHeader={({section: {data, title}}) => (
            <SectionTitleComponent title={title} data={data} />
          )}
          onRefresh={pullToRefresh}
          refreshing={isLoading}
        />
      </View>
    );
  });
