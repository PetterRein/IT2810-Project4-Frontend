import React, { useEffect } from 'react'
import { useStateValue, retrieveData } from '../store/Store';

import {
  Text,
	View,
	StyleSheet
} from 'react-native';
import { RadioButton, Card, Drawer } from 'react-native-material-ui';

import { Title, Divider } from 'react-native-paper';

import {
  Picker
} from 'react-native';

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
		<Picker.Item key={value} label={value.toString()} value={value} />
	)
  return (
		<View style={ styles.box }>
			<Title>Minimum Score </Title>
				<Picker
					selectedValue={score}
					onValueChange={(value) =>
							dispatch({
								type: 'UPDATE_SCORE',
								score: value
							})
					}
				>
					{valueButtons}
				</Picker>
				<Divider />
		</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	row: {
		    flex: 1,
		    flexDirection: 'row',
		    flexWrap: 'wrap',
		    alignItems: 'center',
				paddingHorizontal: 22,
	},
	movie: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
  col: {
		    width: '50%' // is 50% of container width
	},
	box: {
		paddingHorizontal: 22,
	}
});