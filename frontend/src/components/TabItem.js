import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from '../../utils/Dimentions'
import ItemList from './ItemList'


const TabItem = (props) => {

    const renderItem = ({ item, index }) => {
        if (item.idType === props.idSelected)
            return (
                <TouchableOpacity
                    onPress={() => { alert('hello') }}
                    style={{
                        width: windowWidth / 4,
                        height: windowHeight / 10,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#000',
                        marginBottom: 10,
                    }}>
                    <Text>
                        {item.name}
                    </Text>
                </TouchableOpacity>)
    }
    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            style={{ paddingVertical: '3%', }}
            contentContainerStyle={{ paddingLeft: '3%', }}
            keyExtractor={item => `keyTabItem-${item.id}`} />
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 40,
    }
})
