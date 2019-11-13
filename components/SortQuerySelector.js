import React from 'react'
import {
  Text,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


// Lager radio buttons sånn at du kan velge retning på sorteringen og hvilket felt du vil sortere
function RadioButtons (props) {
  return (
          <RadioButton labelHorizontal={true} key={props.name} >
            <RadioButtonInput
              index={props.value}
              isSelected={props.value === props.checked}
              borderWidth={1}
              buttonInnerColor={'#0000ff'}
              buttonOuterColor={'#2196f3'}
              buttonSize={40}
              buttonOuterSize={80}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}/>
              <RadioButtonLabel
                obj={{label: props.name}}
                index={props.name}
                labelHorizontal={true}
                labelStyle={{fontSize: 20, color: '#000000'}}
                labelWrapStyle={{}}
              />
          </RadioButton>
  )
};
export const SortQuerySelector = (props) => {

  const sortField = [{ name: 'Title', value: 'title', type: 'field' }, { name: 'Release Date', value: 'release_date', type: 'field' }, { name: 'Score', value: 'vote_average', type: 'field' }, { name: 'None fields', value: '', type: 'field' }]
  const sortFieldButtons = sortField.map((field) =>
    <RadioButtons checked={props.sortFieldChecked} key={field.name} name={field.name} value={field.value} type={field.type}/>)
  const sortFieldDirectionection = [{ name:'DESC', value: "true", type: 'direction' }, { name: 'ASC', value: "false", type: 'direction' }]
  const sortFieldDirectionectionButtons = sortFieldDirectionection.map((direction) =>
    <RadioButtons checked={props.sortDirChecked} key={direction.name} name={direction.name} value={direction.value} type={direction.type}/>)
  return (
    <Text>
      Sort by field:
      <br></br>
      <RadioForm formHorizontal={true} animation={true}>
        {sortFieldButtons}
      </RadioForm>
      <br></br>
      Sort direction:
      <br></br>
      <RadioForm formHorizontal={true} animation={true}>
        {sortFieldDirectionectionButtons}
      </RadioForm>
    </Text>
  )
}