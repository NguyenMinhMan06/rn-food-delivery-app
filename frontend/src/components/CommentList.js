import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AirbnbRating } from 'react-native-ratings'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors, fonts } from '../../assets/style'
import { arrayIsEmpty } from '../../utils/function'

const CommentList = (props) => {
    console.log('im comment', props.data)

    let renderComment = []
    !arrayIsEmpty(props.data.commentArray) ?
        props.data.commentArray.map((item, index) => {
            return renderComment.push(
                <TouchableOpacity style={{ borderRadius: 10, paddingVertical: 10, flexDirection: 'row', marginVertical: 4, width: '100%', borderWidth: 1 }} key={index}>
                    <View style={{ paddingRight: 10, width: '20%' }}>

                        <Image source={require('../../assets/images/chicago-hot-dog.jpg')} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode={'cover'} />

                    </View>

                    <View style={{ width: '80%', }}>
                        <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold', paddingBottom: 4, }}>
                            {item.username}
                        </Text>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={item.rating}
                                ratingContainerStyle={{ alignItems: 'flex-start' }}
                            />
                        </View>

                        <Text style={{ ...fonts.type1 }}>
                            {item.commentDetail}
                        </Text>
                    </View>
                </TouchableOpacity >
            )
        })
        :
        renderComment.push(
            < View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%', paddingTop: 40, }}>
                <Text style={{ ...fonts.type1, fontSize: 16, color: colors.default }}>
                    No review
                </Text>
            </View>
        )
    return (
        <ScrollView style={{ width: '100%', paddingHorizontal: '3%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10, width: '20%' }}>
                    <Text style={{ ...fonts.type1, fontSize: 26, fontWeight: 'bold' }}>
                        {props.data.avgRating}
                    </Text>
                    <Text style={{ ...fonts.type1, fontSize: 26, }}>
                        Total
                    </Text>

                </View>

                <View style={{ width: '80%', }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingBottom: 10, }}>
                        <View style={{ alignItems: 'center', padding: 4, borderColor: colors.default, borderWidth: 1 }} >
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={parseInt(5)}
                            />
                            <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                ({props.data.rating.fiveStar > 99 ? '99+' : props.data.rating.fiveStar})
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: 4, borderColor: colors.default, borderWidth: 1 }} >
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={parseInt(4)}
                            />
                            <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                ({props.data.rating.fourStar > 99 ? '99+' : props.data.rating.fourStar})
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: 4, borderColor: colors.default, borderWidth: 1 }} >
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={parseInt(3)}
                            />
                            <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                ({props.data.rating.threeStar > 99 ? '99+' : props.data.rating.threeStar})
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', paddingBottom: 10, }}>
                        <View style={{ alignItems: 'center', padding: 4, borderColor: colors.default, borderWidth: 1 }} >
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={parseInt(2)}
                            />
                            <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                ({props.data.rating.twoStar > 99 ? '99+' : props.data.rating.twoStar})
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: 4, borderColor: colors.default, borderWidth: 1 }} >
                            <AirbnbRating
                                count={5}
                                size={10}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={parseInt(1)}
                            />
                            <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                ({props.data.rating.oneStar > 99 ? '99+' : props.data.rating.oneStar})
                            </Text>
                        </View>
                    </View>



                </View>
            </View>
            {renderComment}

        </ScrollView >

    )

}

export default CommentList

const styles = StyleSheet.create({})
