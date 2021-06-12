import React, {useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import {toggleFavorite} from '../store/actions/meals'

const ListItem = props => {
  return (
  <View style= {styles.listItem}>
    <Text>{props.children}</Text>
  </View>
  );
}

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state =>
       state.meals.favoriteMeals.some(meal => meal.id===meal.id));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    
    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

 useEffect(() => {
       props.navigation.setParams({toggleFav: toggleFavouriteHandler});
    }, [toggleFavouriteHandler]);
  
    useEffect(() => {
      props.navigation.setParams({isFav: currentMealIsFavorite})
    },[currentMealIsFavorite])

  return (
    <ScrollView>
       <View style={styles.details}>
            <Text>{selectedMeal.duration}m</Text>
            <Text>{selectedMeal.complexity.toUpperCase()}</Text>
            <Text>{selectedMeal.affordability.toUpperCase()}</Text>
          </View>
          <Text style={styles.title}>Ingredients</Text>
          {selectedMeal.indgredients.map(indgredient => (
            <ListItem key={indgredient}>{indgredient}</ListItem>
          ))}
          <Text style={styles.title}>Steps</Text>
          {selectedMeal.steps.map(steps => (
            <ListItem key={steps}>{steps}</ListItem>
          ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
      headerTitle: mealTitle,
      headerRight:  ( () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favourite" iconName={isFavorite ? 'ios-star' : 'ios-star-outline' } 
        onPress={toggleFavorite} />
      </HeaderButtons>
      )
    };
  };
  
  const styles = StyleSheet.create({
    image:{
      width: '100%',
      height: 200,
      borderRadius: 15,
      
    },
    details:{
      flexDirection: 'row',
      padding: 15,
       
    },
    title:{
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      textAlign: 'center',
      color: '#a685e2'
    },
    listItem:{
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10
    }
  });

export default MealDetailScreen;
