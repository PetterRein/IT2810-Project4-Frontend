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
import MovieList from '../components/MovieList'

import { ScoreQuerySelector } from '../components/ScoreQuerySelector';
import { SearchField } from '../components/SearchQuerySelector';
import { PageSelector } from '../components/Pagination';

export default function HomeScreen() {
  return (
		<SafeAreaView style={styles.container}>
			<SearchField />
			<SortQuerySelector />
			<ScoreQuerySelector />
			<PageSelector />
      <MovieList/>
			<PageSelector />
		</SafeAreaView>
	);
}

HomeScreen.navigationOptions = {
  header: null,
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	row: {
		    flex: 1,
		    flexDirection: 'row',
		    flexWrap: 'wrap',
		    alignItems: 'center',
				paddingHorizontal: 22,
	},
	movie: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
  col: {
		    width: '50%' // is 50% of container width
	},
	box: {
		paddingHorizontal: 22,
	}
});

