import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
	FlatList,
  StyleSheet,
	SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';


import { SortQuerySelector } from '../components/SortQuerySelector'


export default function HomeScreen() {

  return (
		<SafeAreaView style={styles.container}>
			<SortQuerySelector sortFieldChecked={''} sortDirChecked={'true'}/>
		</SafeAreaView>
	);
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	movie: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});