import React from 'react'
import { useStateValue } from '../store/Store';

import {
  Text,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


// Lager radio buttons sånn at du kan velge retning på sorteringen og hvilket felt du vil sortere
function RadioButtons (props) {
  return (
    <RadioButton labelHorizontal={true} key={props.name} >
      <RadioButtonInput
        index={props.name}
        obj={{value: props.value}}
        isSelected={props.value === props.checked}
        borderWidth={1}
        buttonInnerColor={'#0000ff'}
        buttonOuterColor={'#2196f3'}
        buttonSize={40}
        buttonOuterSize={80}
        buttonStyle={{}}
        buttonWrapStyle={{marginLeft: 10}}
        onPress={props.onPress} />
        <RadioButtonLabel
          obj={{label: props.name, value: props.value}}
          index={props.name}
          labelHorizontal={true}
          labelStyle={{fontSize: 20, color: '#000000'}}
          labelWrapStyle={{}}
          onPress={props.onPress}
        />
    </RadioButton>
  )
};
export const SortQuerySelector = () => {
  const [{ sortField, sortDir }, dispatch] = useStateValue();
  const sortFields = [{ name: 'Title', value: 'title', type: 'field' }, { name: 'Release Date', value: 'release_date', type: 'field' }, { name: 'Score', value: 'vote_average', type: 'field' }]
  const sortFieldButtons = sortFields.map((field) =>
    <RadioButtons checked={sortField} key={field.name} name={field.name} value={field.value} type={field.type} onPress={(value) => { 
      dispatch({
        type: 'UPDATE_SORTFIELD',
        sortField: value
      })}}/>)
  const sortFieldDirectionection = [{ name:'DESC', value: true, type: 'direction' }, { name: 'ASC', value: false, type: 'direction' }]
  const sortFieldDirectionectionButtons = sortFieldDirectionection.map((direction) =>
    <RadioButtons checked={sortDir} key={direction.name} name={direction.name} value={direction.value} type={direction.type} onPress={(value) => { 
      dispatch({
        type: 'UPDATE_SORTDIR',
        sortDir: value
      })}}/>)
  return (
    <>
      <Text>
        Sort by field:
        {"\n"}
      </Text>
      <RadioForm formHorizontal={true} animation={true}>
        {sortFieldButtons}
      </RadioForm>
      <Text>
        {"\n"}
        Sort direction:
        {"\n"}
      </Text>
      <RadioForm formHorizontal={true} animation={true}>
        {sortFieldDirectionectionButtons}
      </RadioForm>
    </>
  )
}