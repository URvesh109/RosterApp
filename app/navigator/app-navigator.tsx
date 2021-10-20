import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EventDetailsScreen, EventsScreen, DutiesScreen} from '../screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt, faSuitcase} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../theme';
import moment from 'moment';

export type NavigatorParamList = {
  event: undefined;
  eventDetails: {id: string; date?: string};
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const EventStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="event"
      screenOptions={{headerBackTitle: ''}}>
      <Stack.Screen
        name="event"
        component={EventsScreen}
        options={{title: 'Events'}}
      />
      <Stack.Screen
        name="eventDetails"
        component={EventDetailsScreen}
        options={({route}) => ({title: route.params.date})}
      />
    </Stack.Navigator>
  );
};

export type DutyNavigatorParamList = {
  duties: undefined;
  eventDetails: {id: string; date?: string};
};

const DutyStack = createNativeStackNavigator<DutyNavigatorParamList>();

const DutyNavigator = () => {
  const currentDate = moment().format('ddd MMMM D, YYYY');

  return (
    <DutyStack.Navigator
      initialRouteName="duties"
      screenOptions={{headerBackTitle: ''}}>
      <DutyStack.Screen
        name="duties"
        component={DutiesScreen}
        options={{title: currentDate}}
      />
      <DutyStack.Screen
        name="eventDetails"
        component={EventDetailsScreen}
        options={{title: currentDate}}
      />
    </DutyStack.Navigator>
  );
};

export type TabNavigatorParamList = {
  eventHome: undefined;
  dutyHome: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const ActiveInactiveTab = {
  tabBarActiveTintColor: COLORS.black,
  tabBarInactiveTintColor: COLORS.lightGrey,
};

const TabNav = () => {
  return (
    <Tab.Navigator initialRouteName="dutyHome">
      <Tab.Screen
        name="dutyHome"
        component={DutyNavigator}
        options={{
          title: 'Duties',
          headerShown: false,
          ...ActiveInactiveTab,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faSuitcase}
              color={focused ? COLORS.black : COLORS.lightGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="eventHome"
        component={EventStack}
        options={{
          headerShown: false,
          title: 'Event',
          ...ActiveInactiveTab,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCalendarAlt}
              color={focused ? COLORS.black : COLORS.lightGrey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer {...props}>
      <TabNav />
    </NavigationContainer>
  );
};
