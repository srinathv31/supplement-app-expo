import React from "react";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconI from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CategoryBoxes({ setCategorySelect }: {
    setCategorySelect: (c: "Supplement"|"Food"|"Water"|"Exercise"|"Home") => void
}) {

    const categories1 = [
        { name: "Supplements", colors: ["#ee0979", "#ff6a00"], icon: "lightning-bolt", function: () => setCategorySelect("Supplement") },
        { name: "Food", colors: ["#c31432", "#240b36"], icon: "food-variant", function: () => setCategorySelect("Food") },
    ];

    const categories2 = [
        { name: "Water", colors: ["#36D1DC", "#5B86E5"], icon: "water", function: () => setCategorySelect("Water") },
        { name: "Exercise", colors: ["#8E2DE2", "#4A00E0"], icon: "bicycle", function: () => setCategorySelect("Exercise") }
    ];

    return(
        <View style={{ width: "90%" }}>
            <View style={{ flexDirection: "row", height: "40%" }}>
                {categories1.map((item, index) => {
                    return (
                        <LinearGradient key={index} colors={item.colors} style={{ padding: 10, margin: 10, width: "50%", borderRadius: 10, backgroundColor: "#163059", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                            <Icon onPress={item.function} name={item.icon} style={{ color: "white", alignSelf: "center" }} size={70}></Icon>
                        </LinearGradient>
                    );
                })}
            </View>
            <View style={{ flexDirection: "row", height: "40%" }}>
                {categories2.map((item, index) => {
                    return (
                        <LinearGradient key={index} colors={item.colors} style={{ padding: 10, margin: 10, width: "50%", borderRadius: 10, backgroundColor: "#163059", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                            <IconI onPress={item.function} name={item.icon} style={{ color: "white", alignSelf: "center" }} size={70}></IconI>
                        </LinearGradient>
                    );
                })}
            </View>
        </View>
    );
}