import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EventDetailsScreen, EventsScreen, DutiesScreen} from '../screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faSuitcase,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../theme';

export type NavigatorParamList = {
  event: undefined;
  eventDetails: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const EventStack = () => {
  return (
    <Stack.Navigator initialRouteName="event">
      <Stack.Screen
        name="event"
        component={EventsScreen}
        options={{title: 'Events'}}
      />
      <Stack.Screen
        name="eventDetails"
        component={EventDetailsScreen}
        options={{title: 'Event Details'}}
      />
    </Stack.Navigator>
  );
};

export type TabNavigatorParamList = {
  eventHome: undefined;
  duties: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const ActiveInactiveTab = {
  tabBarActiveTintColor: COLORS.black,
  tabBarInactiveTintColor: COLORS.lightGrey,
};

const TabNav = () => {
  return (
    <Tab.Navigator initialRouteName="eventHome">
      <Tab.Screen
        name="duties"
        component={DutiesScreen}
        options={{
          title: 'Duties',
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
