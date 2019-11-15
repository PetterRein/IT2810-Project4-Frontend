
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
import { Button } from 'react-native-paper';


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
              id
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
  let release_date 
  let comments
  if (movie) {
    const release_date_convert = new Date(movie.release_date)
    release_date = release_date_convert.getDate() + "." + release_date_convert.getMonth() + "." + release_date_convert.getFullYear()
    comments = movie.comments
  }
  console.log("comments: ", comments)
  return (
    movie ? 
      <>
      <TouchableHighlight onPress={() => props.navigation.navigate('Home')} >
        <View style={styles.container} >
          <Image
            style={{width: 300, height: 400}}
            source={{uri: API_KEY + '/images' + movie.poster_path}}
          />
          <Text style={styles.text}>{movie.title}</Text>
          <Text style={styles.text}>Release date: {release_date}</Text>
          <Text style={styles.text}>Score: {movie.vote_average}</Text>
          <Text style={styles.text}>Comments:</Text>
          <View style={styles.container}>
          <FlatList
            data={comments}
            renderItem={( item ) => <Text style={styles.text}>{item.comment}</Text>}
            keyExtractor={item => item.id} /> 
            </View>
        </View>
      </TouchableHighlight> 
      <Button style={styles.button} title="Press Purple"  onPress={() => props.navigation.navigate('Home')} >Go Back</Button>
      </>
     : <></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    height: 100,
  },
  text: {
    color: '#000',
    fontSize: 30
  },
  button: {
    paddingTop: 700
  }
});

export default withNavigation(DetailView)