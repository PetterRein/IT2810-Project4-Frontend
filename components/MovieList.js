import React, {Component, useEffect, useState} from 'react';
import { API_KEY } from 'react-native-dotenv'
import { useStateValue } from '../store/Store';

import {
	Text,
	View, 
	FlatList,
	StyleSheet,
	Image,
} from 'react-native';

import { styles } from '../screens/HomeScreen'

import { ListItem } from 'react-native-material-ui';

function Movie({ movieObject }) {
	return (
		<View  style={styles.container}>
			<ListItem 
				leftElement={	<Image style={{width: 40, height: 50}} source={{uri: API_KEY + '/images' + movieObject.poster_path}} /> }
				centerElement={{
					primaryText: movieObject.title,
					secondaryText: movieObject.release_date + " " + movieObject.vote_average,
				}}
			/>
		</View>
	);
}


export function MovieList(props) {
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
				renderItem={({ item }) => <Movie movieObject={item} />}
				keyExtractor={item => item.id} /> 
		</View>
			:
		<View style={styles.container}>
			<Text style={styles.text}> No movies found with the search params </Text>
		</View>
		);
}

