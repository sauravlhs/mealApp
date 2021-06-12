import React from 'react';
import {Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from "react-navigation";
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FilterScreen from '../screens/FilterScreen';
import FavoritesScreen from '../screens/FavoriteScreen';

const defaultStackNavOptions ={
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
   
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}


const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals:  CategoryMealsScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
    
}
);

const FavNavigator = createStackNavigator({
  Favourites: FavoritesScreen ,
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  
    Meals: {screen: MealsNavigator, navigationOptions:{
      tabBarIcon: (tabInfo) => {
        return (
        <Ionicons name="fast-food-outline" size={25} color={tabInfo.tintColor}/>
        );
      },
      tabBarColor: Colors.primaryColor
    } 
  },
    Favourites: {screen: FavNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
        <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
        );
      },
      tabBarColor: Colors.accentColor
    }}
  
};

const MealsFavTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeColor : 'white',
  shifting: true
  
}) 
 : createBottomTabNavigator( tabScreenConfig, {
   tabBarOptions:{
     activeColor : Colors.accentColor
   }
 });

 const FilterNavigator = createStackNavigator({
   Filters: FilterScreen
 },
 {
  navigationOptions: {
    drawerLabel: 'Filters'
  },
  defaultNavigationOptions: defaultStackNavOptions
});

  const MainNavigator = createDrawerNavigator({
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters : FilterNavigator
  },{
    contentOptions:{
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans',
        fontSize: 15,
      }
    }
  });


export default createAppContainer(MainNavigator);
