import React, {useEffect} from 'react'
import { useStateValue, retrieveData } from '../store/Store';

import {
	View,
	StyleSheet,
} from 'react-native';

import { styles } from '../screens/HomeScreen'
import { Checkbox } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Divider, Text, Title } from 'react-native-paper';



export const SortQuerySelector = () => {
	const [{ sortField, sortDir }, dispatch] = useStateValue();

  useEffect(() => {
    retrieveData("sortDir").then(sortDir => {
			dispatch({
				type: 'UPDATE_SORTDIR',
				sortDir: sortDir
			})
		})
		retrieveData("sortField").then(sortField => {
			dispatch({
				type: 'UPDATE_SORTFIELD',
				sortField: sortField
			})
    })
  }, [])
  return (
		<View style={styles.row} >
			<View style={styles.col} >

				<Title>Sort by field</Title>
				<RadioButton.Group
					onValueChange={
						value => dispatch({
							type: 'UPDATE_SORTFIELD',
							sortField: value })
					}
					value={sortField}
				>
					<View>
						<Text>Title</Text>
						<RadioButton value="title" />
					</View>
					<View>
						<Text>Release Date</Text>
						<RadioButton value="release_date" />
					</View>
					<View>
						<Text>Average Vote</Text>
						<RadioButton value="vote_average" />
					</View>
				</RadioButton.Group>
			</View>


			<View style={styles.col} >
				<Title>Sort direction</Title>
				<RadioButton.Group
					onValueChange={
						value => dispatch({
							type: 'UPDATE_SORTDIR',
							sortDir: value })
					}
					value={sortDir}
				>
					<View>
						<Text>Ascending</Text>
						<RadioButton value="true" />
					</View>
					<View>
						<Text>Descending</Text>
						<RadioButton value="false" />
					</View>
				</RadioButton.Group>
			</View>
		</View>
  )
}

