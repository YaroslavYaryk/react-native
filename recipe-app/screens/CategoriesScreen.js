import { StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButtons";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: "CategoryMeals",
                        params: {
                            categoryId: itemData.item.id,
                        },
                    });
                }}
                color={itemData.item.color}
            />
        );
    };
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Meal Categories",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
    },
});

export default CategoriesScreen;
