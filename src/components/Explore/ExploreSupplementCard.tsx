// Source Imports
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import shallow from "zustand/shallow";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import useClientStore from "../../zustand/clientStore";

export default function ExploreSupplementCard({ supplementData, setModalizeRefStatus }: {
    supplementData: Supplement,
    setModalizeRefStatus: (m: boolean) => void,
}): JSX.Element {
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow); 
    const updateSelectedSupplement = useClientStore(state => state.updateSelectedSupplement);

    const longSupplementNames = ["N-Acetylcysteine", "Scutellaria baicalensis", "Ashwagandha", "Rhodiola Rosea"];

    function handleWebOpen() {
        updateSelectedSupplement({ Supplement: supplementData, time: "", taken: "not-taken" });
        if (completedAchievements[2].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 2);
        }
        setModalizeRefStatus(true);
    }

    return(
        <View>
            <TouchableOpacity onPress={() => handleWebOpen()}>
                <View>
                    <Text style={[styles.ListItem, { fontSize: longSupplementNames.includes(supplementData.name) ? 18 : 24 }]}>{supplementData.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    ListItem: {
        fontSize: 24,
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "white",
        width: 160,
    },
});
