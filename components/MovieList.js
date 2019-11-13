import gql from 'graphql-tag';
import React, {Component, useEffect, useState} from 'react';
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

		function fetchMovies() {
			const data = fetch('http://localhost:5050/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: `{
					movies {
						title,
						id,
						release_date
					}
				}` }),
			}).then(res => {
				return res.json()
			})
			return data
		}

	  useEffect(() => {
			fetchMovies().then(response => {
				setMovies(response.data.movies);
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

