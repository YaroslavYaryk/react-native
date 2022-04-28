import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealList = (props) => {
    const favoriteMeals = useSelector((state) => state.meals.favoritesMeals);

    const renderMealItem = (itemData) => {
        const isFavorite = favoriteMeals.some(
            (meal) => meal.id === itemData.item.id
        );

        return (
            <MealItem
                meal={itemData.item}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: "MealDetail",
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFavorite: isFavorite,
                        },
                    });
                }}
            />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: "100%" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
});

export default MealList;
