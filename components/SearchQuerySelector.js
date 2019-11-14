import React from 'react'
import { useStateValue } from '../store/Store';
import {
  Text,
  TextInput
} from 'react-native';


// Rendere et object på siden som lar deg søke med et text felt du lan skrive i
export const SearchField = () => {
  const [{ search }, dispatch] = useStateValue();

  function  handleChange (value) {
    dispatch({
      type: 'UPDATE_SEARCH',
      search: value
    })
  }
  return (
    <>
      <Text>
        Search: 
      </Text>
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={search} 
        onChangeText={handleChange}/>
      </>
  )
}