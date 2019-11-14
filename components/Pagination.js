import React, {useEffect} from 'react'
import { useStateValue } from '../store/Store';
import { API_KEY } from 'react-native-dotenv'
import {
  Picker
} from 'react-native';

function Options (value) {
  const label = "Page: " + (value + 1)
  return <Picker.Item key={value} value={value} label={label}/>
}

// Lager et object som lar deg velge hvilken side du skal være på
export const PageSelector = () => {
  const [{ first, search, score, nrMovies }, dispatch] = useStateValue();

  async function fetchNrMovies() {
    try {
      const res = await fetch(API_KEY + '/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{
            numberOfMovies (filter: "${search}", vote_average: ${score})
          }` 
        }),
      });
      let responseJson = await res.json()
      return responseJson.data.numberOfMovies
    } catch (error) {
      console.log(error)
    }
  }

  function  handleChange (page) {
    dispatch({
      type: 'UPDATE_PAGE',
			skip: page * first
    })
  }

  useEffect(() => {
    fetchNrMovies().then(numberOfMovies =>
      dispatch({
        type: 'UPDATE_NRMOVIES',
				nrMovies: numberOfMovies
      }))
  }, [search, score]);

  const numberOfPagesNeeded =  Math.ceil(nrMovies / 6)
  const pages = []

  for (let i = 0; i < numberOfPagesNeeded; i++) {
    pages.push(Options(i))
  }

  return  ( 
    numberOfPagesNeeded && pages && pages.length ?
      <Picker onValueChange={handleChange} style={{height: 50, width: 100}}>
        {pages}
      </Picker>
	  : <></>
  )
}
