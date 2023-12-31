// Source Imports
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import LinearGradient from "react-native-linear-gradient";
import Divider from "../Design/Divider";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import analytics from "@react-native-firebase/analytics";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";
import { PageCategory } from "../../interfaces/AppTypes";

export default function ExploreWindow({ setModalizeRefStatus, categorySelect }: {
    setModalizeRefStatus: (m: boolean) => void,
    categorySelect: PageCategory
}): JSX.Element {
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow); 
    const updateSelectedSupplement = useClientStore(state => state.updateSelectedSupplement);

    const [randomSupplement, setRandomSupplement] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            grabRandomSupplement();
        }, 10000);
	
        return () => (clearInterval(interval)); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    function grabRandomSupplement(): number {
        const randomIndex = Math.floor(Math.random() * (SupplementList.length - 0) + 0);
        setRandomSupplement(randomIndex);
        return randomIndex;
    }

    function handleTouch(supp: Supplement) {
        updateSelectedSupplement({ Supplement: supp, time: "", taken: "not-taken" });
        if (completedAchievements[2].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 2);
        }
        setModalizeRefStatus(true);
        exploreAnalytics(supp);
    }

    async function exploreAnalytics(supp: Supplement) {
        await analytics().logEvent("explore", {
            id: 3745092,
            item: "Explore Window",
            description: `Clicked on the explore tab for ${supp.name}`
        });
    }

    const colorMap: Record<PageCategory, string[]> = {
        "Home": ["#ee0979", "#ff6a00"],
        "Supplement Schedule": ["#ee0979", "#ff6a00"],
        "Mood": ["#0AB1A2", "#38ef7d"],
        "Water": ["#36D1DC", "#5B86E5"],
        "Analysis": ["#8E2DE2", "#4A00E0"]
    };

    return(
        <View style={{ flexDirection: "column", height: "25%",  margin: 10 }}>
            <TouchableOpacity onPress={() => handleTouch(SupplementList[randomSupplement])}>
                <LinearGradient colors={colorMap[categorySelect]} style={{ justifyContent: "space-evenly", borderRadius: 10, padding: 10, alignItems: "center", height: "100%" }} >
                    <Text style={{ fontSize: 26, fontWeight: "600" }}>Explore</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>{SupplementList[randomSupplement].name}</Text>
                    <Divider length="small" color="black"></Divider>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>{SupplementList[randomSupplement].smallDescription.length > 100 ? SupplementList[randomSupplement].smallDescription.substring(0,100) + "..." : SupplementList[randomSupplement].smallDescription }</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
