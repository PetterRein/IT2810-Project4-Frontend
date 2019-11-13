import React, {Component, useEffect, useState} from 'react';
import { API_KEY } from 'react-native-dotenv'
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
		</View>
	);
}


export function MovieList(props) {
		const [movies, setMovies] = useState(0);

		async function fetchMovies() {
			const res = await fetch(API_KEY + '/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
				query: `{
					movies (first: ${props.first}, skip: ${props.skip}){
						title,
						id,
						release_date,
						poster_path
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

