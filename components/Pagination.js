import React, {useEffect} from 'react'
import { useStateValue, retrieveData } from '../store/Store';
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
  const [{ first, nrMovies, skip }, dispatch] = useStateValue();

  function  handleChange (page) {
    dispatch({
      type: 'UPDATE_PAGE',
			skip: page * first
    })
  }

  useEffect(() => {
    retrieveData("page").then(page => {
      if (page){
        dispatch({
          type: 'UPDATE_PAGE',
          skip: page
        })
      }
    })
  }, [])
  const numberOfPagesNeeded =  Math.ceil(nrMovies / first)
  const pages = []

  const selectedPage = Math.ceil(skip / first)
  for (let i = 0; i < numberOfPagesNeeded; i++) {
    pages.push(Options(i))
  }

  return  ( 
    numberOfPagesNeeded && pages && pages.length ?
      <Picker selectedValue={selectedPage} onValueChange={handleChange} style={{height: 50, width: 150}}>
        {pages}
      </Picker>
	  : <></>
  )
}
