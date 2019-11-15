
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


const DetailView = (props) => {
  const [{ movieId }, dispatch] = useStateValue();
  const [movie, setMovie] = useState(0);

  async function fetchMovies() {
    // dont remove the console log below, the fetch wont load if not
    console.log("")
    try {
      const res = await fetch(API_KEY + '/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        query: `{
          movie (id: "${movieId}") {
            title
            overview
            poster_path
            release_date
            vote_average
            comments {
              comment
            }
          }
        }` }),
      });
      let responseJson = await res.json()
      return responseJson.data.movie
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies().then(movie => {
      setMovie(movie)
    }
    )
  }, [ movieId ]);
  const release_date_convert = new Date(movie.release_date)
  const release_date = release_date_convert.getDate() + "." + release_date_convert.getMonth() + "." + release_date_convert.getFullYear()
  const comments = movie.comments
  console.log(comments)
  return (
    movie ? 
    <TouchableHighlight onPress={() => props.navigation.navigate('Home')} >
      <View  style={styles.container} >
      <Image
        style={{width: 150, height: 300}}
        source={{uri: API_KEY + '/images' + movie.poster_path}}
      />
      <Text style={styles.text}>{movie.title}</Text>
      <Text style={styles.text}>Release date: {release_date}</Text>
      <Text style={styles.text}>Score: {movie.vote_average}</Text>
      <Text style={styles.text}>Comments:</Text>
      <FlatList
				data={comments}
				renderItem={( item ) => <Text>{item.comment}</Text>}
				keyExtractor={item => item.comment} /> 
    </View>
    </TouchableHighlight> : <></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    height: 100,
  },
  text: {
    fontSize: 30
  }
});

export default withNavigation(DetailView)