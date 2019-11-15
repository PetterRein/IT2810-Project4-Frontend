import React, {createContext, useContext, useReducer} from 'react';
import {AsyncStorage} from 'react-native';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (error) {
    console.error("Error saving data: " + error)
  }
};

export const retrieveData = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Error retriving data: " + error)
  }
};

export const initialState = {
  sortField: "title",
  sortDir: true,
  first: 6,
  skip: 0,
  score: 0,
  search: "",
  nrMovies: 0,
  movies: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SORTDIR':
      storeData("sortDir", action.sortDir)
      return {
        ...state,
        sortDir: action.sortDir
      };
    case 'UPDATE_SORTFIELD':
      storeData("sortField", action.sortField)
      return {
          ...state,
          sortField: action.sortField
      };

    case 'UPDATE_MOVIES':
      return {
          ...state,
          movies: action.movies.movies,
          nrMovies: action.movies.nrMovies
      };
    
    case 'UPDATE_SCORE':
      storeData("score", action.score)
      storeData("page", 0)
      return {
          ...state,
          score: action.score,
          skip: 0
      };

    case 'UPDATE_SCORE_INITIAL':
        storeData("score", action.score)
        return {
            ...state,
            score: action.score
        };
    case 'UPDATE_SEARCH':
      storeData("search", action.search)
      storeData("page", 0)
      return {
        ...state,
        search: action.search,
        skip: 0
      };

    case 'UPDATE_SEARCH_INITIAL':
      return {
          ...state,
          search: action.search
      };
    case 'UPDATE_NRMOVIES':
      return {
          ...state,
          nrMovies: action.nrMovies
      };

    case 'UPDATE_PAGE':
      storeData("page", action.skip)
      return {
          ...state,
          skip: action.skip
      };
      
    default:
      return state;
  }
};

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
