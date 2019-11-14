import * as WebBrowser from 'expo-web-browser';
import React, {useReducer} from 'react';
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
import { MovieList } from '../components/MovieList'

import {initialState, reducer, StateProvider} from '../store/Store'
import { ScoreQuerySelector } from '../components/ScoreQuerySelector';
import { SearchField } from '../components/SearchQuerySelector';

export default function HomeScreen() {

  return (
	<StateProvider initialState={initialState} reducer={reducer}>
		<SafeAreaView style={styles.container}>
			<SortQuerySelector />
			<ScoreQuerySelector />
			<SearchField />
      <MovieList/>
		</SafeAreaView>
	</StateProvider>
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