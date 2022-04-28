import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FilterScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Text, Platform } from "react-native";
        

const navigationOptions = {
    mode: "modal",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:
                Platform.OS === "android" ? Colors.primaryColor : "white",
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans",
        },
        headerTintColor:
            Platform.OS === "android" ? "white" : Colors.primaryColor,
    },
};

const MealNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            headerTitle: "Meal Categories",
        },
        CategoryMeals: CategoryMealsScreen,
        MealDetail: MealDetailsScreen,
    },
    navigationOptions
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailsScreen,
    },
    navigationOptions
);

const screenOption = {
    Meals: {
        screen: MealNavigator,
        navigationOptions: {
            tabBarLabel: "Menu",

            tabBarIcon: (tabInformation) => {
                return (
                    <Ionicons name="ios-restaurant" color={"#ccc"} size={25} />
                );
            },
            tabBarColor: Colors.greenIshColor,
            tabBarLabel:
                Platform.OS === "android" ? (
                    <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
                ) : (
                    "Meals"
                ),
        },
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInformation) => {
                return <Ionicons name="ios-star" color={"#ccc"} size={25} />;
            },
            tabBarColor: Colors.blueIshColor,
            tabBarLabel:
                Platform.OS === "android" ? (
                    <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
                ) : (
                    "Meals"
                ),
        },
    },
};

const MealTabFavNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(screenOption, {
              activeColor: Colors.accentColor,
              inactiveColor: Colors.blueIshColor,
              shifting: true,
              labelStyle: {
                  fontFamily: "open-sans-bold",
              },
              //   barStyle: { backgroundColor: "#006600" },
          })
        : createBottomTabNavigator(screenOption, {
              tabBarOptions: {
                  labelStyle: {
                      fontFamily: "open-sans-bold",
                  },
                  activeTintColor: Colors.accentColor,
                  inactiveTintColor: Colors.blueIshColor,
              },
          });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FilterScreen,
    },
    navigationOptions
);

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealTabFavNavigator,
            navigationOptions: {
                drawerLabel: "Meals",
            },
        },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: "open-sans-bold",
            },
        },
    }
);

export default createAppContainer(MainNavigator);
