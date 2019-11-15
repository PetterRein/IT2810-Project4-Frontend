import React, {useEffect} from 'react'
import { useStateValue, retrieveData } from '../store/Store';
import {
  Text,
	View,
  TextInput
} from 'react-native';

import { styles } from '../screens/HomeScreen'

import { Toolbar } from 'react-native-material-ui';



// Rendere et object på siden som lar deg søke med et text felt du lan skrive i
export const SearchField = () => {
  const [{ search }, dispatch] = useStateValue();

  useEffect(() => {
    retrieveData("search").then(search => {
      if (search){
        dispatch({
          type: 'UPDATE_SEARCH_INITIAL',
          search: search
        })
      }
    })
  }, [])

  function  handleChange (value) {
    dispatch({
      type: 'UPDATE_SEARCH',
      search: value
    })
  }
  return (
		<View>
      <Toolbar 
				searchable={{
					autoFocus: true,
					placeholder: 'Movie Title',
					onChangeText: handleChange,
				}}
			/>
		</View>
  )
}
