// Source Imports
import React from "react";
import { View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import { AppProps } from "../interfaces/Props";


export default function HomePage(AllProps: AppProps): JSX.Element {
	return(
		<View>
			<ExploreWindow></ExploreWindow>
			<Divider></Divider>
			<DailySupplementWindow
				{...AllProps}
			></DailySupplementWindow>
		</View>
	);
}
