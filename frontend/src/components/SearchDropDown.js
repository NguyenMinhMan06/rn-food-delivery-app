import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Keyboard,
} from 'react-native';

export default function SearchDropDown(props) {
    const { dataSource } = props
    return (
        <TouchableOpacity
            style={styles.container}>
            {
                dataSource.length ?

                    dataSource.map((item, index) => {
                        return (
                            <TouchableOpacity
                            
                                key={index}
                                style={styles.subContainer}
                                onPress={() => {
                                    Keyboard.dismiss()
                                    props.onPressItem(item)
                                }}
                            >
                                <View style={styles.itemView}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })

                    :
                    <View
                        style={styles.noResultView}>
                        <Text style={styles.noResultText}>No search items matched</Text>
                    </View>
            }


        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 60,

    },
    subContainer: {
        backgroundColor: '#fff',
        paddingTop: 10,
        marginHorizontal: '3%',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        // marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '94%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: '#000',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    noResultView: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        // margin: 20,
        height: 50,
        width: '94%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },

});