import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MealNavigator from "./navigation/MealNavigator";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import mealsReducer from "./store/reducers/meals";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
    meals: mealsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

const fontsFetch = () => {
    return Font.loadAsync({
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    });
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fontsFetch}
                onFinish={() => {
                    setDataLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }

    return (
        <Provider store={store}>
            <MealNavigator />
        </Provider>
    );
}
