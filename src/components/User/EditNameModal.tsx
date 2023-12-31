// Source Imports
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";
import CustomToast from "../Toast/customToast";
import Icon from "react-native-vector-icons/Ionicons";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";

export default function EditNameModal(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);

    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [selectedForm, setSelectedForm] = useState<"firstName"|"lastName"|"age"|"none">("none");
    const [warningForm, setWarningForm] = useState<("firstName"|"lastName"|"age"|"none")[]>([]);

    // Eliminate whitespace from names
    useEffect(() => {
        setName(name.trim());
        setLastName(lastName.trim());
    }, [name, lastName]);

    function handleSubmit() {
        const warningList: ("firstName"|"lastName"|"age"|"none")[] = [];
        if (name === "") {
            warningList.push("firstName");
        }
        if (lastName === "") {
            warningList.push("lastName");
        }
        setWarningForm(warningList);
        if (warningList.length > 0) {
            console.log("Invalid Entries");
            return;
        }
        // If details are valid => update local user object
        updateUserObjDetails();
        updateModalVisible("user-modal");
    }

    function updateUserObjDetails() {
        const userCopy = { ...userData };
        
        achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 6);

        userCopy.name = name;
        userCopy.lastName = lastName;

        saveUserToPhone(userCopy);
        updateUserData(userCopy);
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "edit-name" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Icon onPress={() => updateModalVisible("user-modal")} name="close-circle-outline" size={20} color={"white"} style={{ margin: 10 }}></Icon>
                    <Text style={{ color: "white", fontSize: 24, textAlign: "center", fontWeight: "300" }}>{"Editing Name..."}</Text>
                    <View style={styles.bar}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: warningForm.includes("firstName") === true ? "crimson" : selectedForm === "firstName" ? "#36D1DC" : "gray" }]}
                            onChangeText={setName}
                            value={name}
                            placeholder="Enter First Name"
                            placeholderTextColor={"gray"}
                            onFocus={() => setSelectedForm("firstName")}
                            onSubmitEditing={() => setSelectedForm("none")}
                            returnKeyType="next"
                        />
                        <Text style={{ color: warningForm.includes("firstName") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>First Name</Text>
                    </View>
                    <View style={styles.bar}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: warningForm.includes("lastName") === true ? "crimson" : selectedForm === "lastName" ? "#36D1DC" : "gray" }]}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="Enter Last Name"
                            placeholderTextColor={"gray"}
                            onFocus={() => setSelectedForm("lastName")}
                            onSubmitEditing={() => setSelectedForm("none")}
                            returnKeyType="next"
                        />
                        <Text style={{ color: warningForm.includes("lastName") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>Last Name</Text>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.textStyle}>Enter</Text>
                    </Pressable>
                </View>
            </View>
            <CustomToast />
        </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    modalView: {
        width: "75%", padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 40,
        elevation: 2,
        width: 125,
        alignSelf: "center"
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    },
    input: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        borderColor: "#36D1DC",
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 10,
        color: "white"
    },
    bar: {
        alignSelf: "center",
    },
    button1: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        padding: 10,
        paddingTop: 10,
        textAlign: "center",
        color: "white",
        fontSize: 23,
        fontWeight: "600"
    }
});
