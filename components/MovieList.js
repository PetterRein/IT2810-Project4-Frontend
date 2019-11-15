import React, {Component, useEffect, useState} from 'react';
import { API_KEY } from 'react-native-dotenv'
import { useStateValue } from '../store/Store';
import { withNavigation } from 'react-navigation';

import {
	Text,
	View, 
	FlatList,
	StyleSheet,
	Image,
	TouchableHighlight
} from 'react-native';

import { ListItem } from 'react-native-material-ui';
function Movie({dispatch, movieObject, navigation }) {
	const onPress = () => {
		dispatch({
			type: 'UPDATE_SELECTEDMOVIE',
			movieId: movieObject.id
		})
		navigation.navigate('Links')
	}
	return (
		<TouchableHighlight onPress={onPress}>

		<View  style={styles.container}>
			<ListItem 
				leftElement={	<Image style={{width: 40, height: 50}} source={{uri: API_KEY + '/images' + movieObject.poster_path}} /> }
				centerElement={{
					primaryText: movieObject.title,
					secondaryText: movieObject.release_date + " " + movieObject.vote_average,
				}}
			/>
		</View>
		</TouchableHighlight>

	);
}


const MovieList = (props) => {
		const [{ first, skip, sortField, sortDir, score, search, movies }, dispatch] = useStateValue();

		async function fetchMovies() {
			try {
				const res = await fetch(API_KEY + '/graphql', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
					query: `{
						movieList (filter: "${search}", first: ${first}, skip: ${skip}, sortField: "${sortField}", sortDir: ${sortDir}, vote_average: ${score}){
							movies {
								title,
								id,
								release_date,
								poster_path,
								vote_average
							}
							nrMovies
						}
					}` }),
				});
				let responseJson = await res.json()
				return responseJson.data.movieList
			} catch (error) {
				console.log(error)
			}
		}

	  useEffect(() => {
			fetchMovies().then(movies =>
				dispatch({
					type: 'UPDATE_MOVIES',
					movies: movies
				})
			)
		}, [ first, skip, sortField, sortDir, score, search ]);

	return (
		movies && movies.length ? 
		<View style={styles.container}>
			<FlatList
				data={movies}
				renderItem={({ item }) => <Movie movieObject={item} dispatch={dispatch} navigation={props.navigation} />}
				keyExtractor={item => item.id} /> 
		</View>
			:
		<View style={styles.container}>
			<Text style={styles.text}> No movies found with the search params or network fetch failed</Text>
		</View>
		);
}

const styles = StyleSheet.create({
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

export default withNavigation(MovieList)