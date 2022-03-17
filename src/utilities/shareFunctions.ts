import Share from "react-native-share";
import { Achievement } from "../interfaces/Achievements";
import { AppProps } from "../interfaces/Props";
import { SupplementObject } from "../interfaces/Supplement";

interface SupplementShareObject {
    name: string,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time",
    takenOffTime?: string,
    note?: string,
    dosage?: string
    unit: string
}

export const shareUrl = async (urlToShare: string, selectedSupplement: SupplementObject) => {
    try { 
        await Share.open({ url: urlToShare, message: `Check out this Supplement called ${selectedSupplement.Supplement.name}!` });
    } catch (e) {
        console.log(e);
    }
};

export const shareAchievement = async (item: Achievement, total: number) => {
    try { 
        await Share.open({ message: `I just unlocked the: \n\n[${item.name}]\n\nachievement! I'm up to ${total}/15 achievements.` });
    } catch (e) {
        console.log(e);
    }
};

export const sharePlan = async (supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"]) => {
    try {
        await Share.open({ message: `My ${daySelected}'s Supplement Schedule:\n${grabSupplementPlan(supplementMap, daySelected)}` });
    } catch (e) {
        console.log(e);
    }
};

export const shareEntirePlan = async (supplementMap: AppProps["supplementMap"]) => {
    try {
        await Share.open({ message: `My Supplement Schedule:\n\n${grabEntireSupplementPlan(supplementMap)}` });
    } catch (e) {
        console.log(e);
    }
};

function grabSupplementPlan(supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"]){
    const supplementList: string[] = [];
    Object.values(supplementMap[daySelected].SupplementSchedule).forEach(item => {
        supplementList.push(`\n${item.time}: ${item.Supplement.name}`);
    });
    return supplementList;
}

function grabEntireSupplementPlan(supplementMap: AppProps["supplementMap"]){
    const supplementPlan: Record<string, SupplementShareObject[]> = {};
    const listOfDates: string[] = []; 
    
    Object.keys(supplementMap).forEach(date => {
        listOfDates.push(date);
    });

    const listOfSortedDates: string[] = sortDates(listOfDates);

    Object.values(listOfSortedDates).forEach(date => {
        Object.values(supplementMap[date].SupplementSchedule).forEach(item => {
            if (supplementPlan[date] === undefined){
                supplementPlan[date] = [];
            }

            supplementPlan[date].push({
                name: item.Supplement.name,
                time: item.time,
                taken: item.taken,
                takenOffTime: item.takenOffTime,
                note: item.note,
                dosage: item.dosage,
                unit: item.Supplement.dosageMetric
            });
        });
    });
    
    console.log(JSON.stringify(supplementPlan, null, 2));
    return JSON.stringify(supplementPlan, null, 2);
}

function sortDates(listOfDates: string[]){
    const listOfDateObjects: Date[] = [];
    const sortedListOfDates: string[] = [];
    
    listOfDates.forEach(date => {
        listOfDateObjects.push(new Date(date));
    });

    const length = listOfDateObjects.length; 
    for(let i=0;i<length;i++){
        let tmp = listOfDateObjects[0];
        let tmpIndex = 0;

        listOfDateObjects.forEach((dateObj, index) => {
            if (dateObj < tmp) {
                tmp = dateObj;
                tmpIndex = index;
            }
        });
        sortedListOfDates.push(`${tmp.getMonth()+1}/${tmp.getDate()}/${tmp.getFullYear()}`);
        listOfDateObjects.splice(tmpIndex, 1);
    }
    return sortedListOfDates;
}
