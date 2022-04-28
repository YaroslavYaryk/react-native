import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoritesMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existiongIndex = state.favoritesMeals.findIndex(
                (meal) => meal.id === action.mealId
            );
            if (existiongIndex >= 0) {
                const updatedFavoritesMeals = [...state.favoritesMeals];
                updatedFavoritesMeals.splice(existiongIndex, 1);
                return { ...state, favoritesMeals: updatedFavoritesMeals };
            } else {
                const mewMeal = state.meals.find(
                    (meal) => meal.id === action.mealId
                );
                return {
                    ...state,
                    favoritesMeals: state.favoritesMeals.concat(mewMeal),
                };
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter((meal) => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.cactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vagetatian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals };
        default:
            return state;
    }
};

export default mealsReducer;
