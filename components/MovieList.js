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


function Movie({ movieObject }) {
	return (
		<View  style={styles.container}>
			<Image
        style={{width: 150, height: 300}}
        source={{uri: API_KEY + '/images' + movieObject.poster_path}}
      />
			<Text style={styles.text}>{movieObject.title}</Text>
			<Text style={styles.text}>{movieObject.release_date}</Text>
			<Text style={styles.text}>{movieObject.vote_average}</Text>
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
						movies (filter: "${search}", first: ${first}, skip: ${skip}, sortField: "${sortField}", sortDir: ${sortDir}, vote_average: ${score}){
							title,
							id,
							release_date,
							poster_path,
							vote_average
						}
					}` }),
				});
				let responseJson = await res.json()
				return responseJson.data.movies
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
			<FlatList
				data={movies}
				renderItem={({ item }) => <Movie movieObject={item} />}
				keyExtractor={item => item.id}
			/> : <Text style={styles.text}> No movies found with the search params </Text>
		);
}



const styles = StyleSheet.create({
	  container: {
			   flex: 1,
				 paddingTop: 22,
				 paddingLeft: 22,
			  },
	  item: {
			    padding: 10,
			    height: 100,
				},
		text: {
			fontSize: 30
		}
})

