import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            IconComponent={Ionicons}
            iconSize={23}
            {...props}
            color={Platform.OS === "ios" ? Colors.primaryColor : "white"}
        />
    );
};

export default CustomHeaderButton;
