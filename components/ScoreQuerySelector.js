import React, { useEffect } from 'react'
import { useStateValue, retrieveData } from '../store/Store';

import {
  Text,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

// Lager radio buttons sånn at du kan velge hvilken score du skal filtere på
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
        buttonSize={5}
        buttonOuterSize={20}
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

export const ScoreQuerySelector = () => {
  useEffect(() => {
    retrieveData("score").then(score => {
      if (score){
        dispatch({
          type: 'UPDATE_SCORE_INITIAL',
          score: parseInt(score)
        })
      }
    })
  }, [])

  const [{ score }, dispatch] = useStateValue();
  const legalValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const valueButtons = legalValues.map((value) =>
    <RadioButtons checked={score} key={value} name={value} value={value} onPress={(value) => { 
      dispatch({
        type: 'UPDATE_SCORE',
        score: value
      })}}/>)
  return (
    <>
      <Text>
        Score Limit:
        {"\n"}
      </Text>
      <RadioForm formHorizontal={true} animation={true}>
        {valueButtons.slice(0, 6)}
      </RadioForm>
      <RadioForm formHorizontal={true} animation={true}>
        {valueButtons.slice(6, 11)}
      </RadioForm>
    </>
  )
}