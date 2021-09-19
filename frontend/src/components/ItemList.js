import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ItemList = (props) => {
    const { item, onPress } = this.props
    return (
        <TouchableOpacity style={styles.container} onPress={()=>alert(item.id)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default ItemList

const styles = StyleSheet.create({
    container: {
        width: 40, height: 40,
        padding: 10,
        backgroundColor:'pink'
    }
})
