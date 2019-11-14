import React, {createContext, useContext, useReducer} from 'react';

export const initialState = {
  sortField: "title",
  sortDir: "true",
  first: 6,
  skip: 0
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SORTDIR':
      return {
        ...state,
        sortDir: action.sortDir
      };
    case 'UPDATE_SORTFIELD':
      return {
          ...state,
          sortField: action.sortField
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