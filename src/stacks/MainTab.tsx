import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import TabBarAdvancedButton from '../components/TabBarAdvancedButton';
import TodayHabitList from '../screens/Home';

const MainStack = createBottomTabNavigator();

const EmptyComponent = () => null;

const IS_IPHONE_X = false;

export default () => {
  const barColor = '#1F2E46';

  return (
    <MainStack.Navigator
      tabBar={(props) => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {IS_IPHONE_X && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: barColor,
                },
              ]}
            />
          )}
        </View>
      )}
      tabBarOptions={{
        showLabel: false,
        style: styles.navigator,
        tabStyle: {
          backgroundColor: barColor,
        },
        allowFontScaling: true,
      }}>
      <MainStack.Screen
        name="Home"
        component={TodayHabitList}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <MainStack.Screen
        name="Stats"
        component={TodayHabitList}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="bar-graph" size={24} color={color} />,
        }}
      />
      <MainStack.Screen
        name="New"
        component={EmptyComponent}
        options={() => ({
          tabBarButton: (props) => <TabBarAdvancedButton bgColor={barColor} {...props} />,
        })}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddHabit');
          },
        })}
      />
      <MainStack.Screen
        name="Plan"
        component={EmptyComponent}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="star" size={24} color={color} />,
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={EmptyComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
    maxHeight: 150,
    height: 40,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
