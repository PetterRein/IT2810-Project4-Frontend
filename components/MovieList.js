import React, {Component, useEffect, useState} from 'react';
import { API_KEY } from 'react-native-dotenv'
import {
	Text,
	View, 
	FlatList,
  StyleSheet,
} from 'react-native';


function Movie({ movieObject }) {
	return (
		<View  style={styles.container}>
			<Text >{movieObject.title}</Text>
			<Text >{movieObject.release_date}</Text>
		</View>
	);
}


export function MovieList(props) {
		const [movies, setMovies] = useState(0);

		async function fetchMovies() {
			const res = await fetch(API_KEY, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
				query: `{
					movies {
						title,
						id,
						release_date
					}
				}` }),
			});
			return res.json();
		}

	  useEffect(() => {
			fetchMovies().then(response => {
				setMovies(response.data.movies);
			}).catch(function(error) {
				console.log('There has been a problem with your fetch operation: ' + error.message);
				throw error;
			});
		}, []);


	return (
			<FlatList
				data={movies}
				renderItem={({ item }) => <Movie movieObject={item} />}
				keyExtractor={item => item.id}
			/>
		);
}



const styles = StyleSheet.create({
	  container: {
			   flex: 1,
			   paddingTop: 22
			  },
	  item: {
			    padding: 10,
			    fontSize: 18,
			    height: 44,
			  },
})

