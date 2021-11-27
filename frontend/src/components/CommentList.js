import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AirbnbRating } from 'react-native-ratings'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors, fonts } from '../../assets/style'
import { arrayIsEmpty } from '../../utils/function'

const CommentList = (props) => {
    console.log(arrayIsEmpty(props.listComment))

    let renderComment = []
    !arrayIsEmpty(props.listComment) &&
        props.listComment.map((item, index) => {
            return renderComment.push(
                <TouchableOpacity style={{ borderRadius: 10, paddingVertical: 10, flexDirection: 'row', marginVertical: 4, width: '100%', borderWidth: 1 }} key={index}>

                    <View style={{ width: '100%', paddingLeft: 20, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...fonts.type1, fontSize: 14, fontWeight: 'bold', paddingBottom: 4, }}>
                                {item.userName} {" - "}
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 14, paddingBottom: 4, }}>
                                {item.userEmail}
                            </Text>
                        </View>
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

                        <Text style={{ ...fonts.type1, fontSize: 16 }}>
                            {item.comment}
                        </Text>
                    </View>
                </TouchableOpacity >
            )
        })
    return (
        <ScrollView style={{ width: '100%', paddingHorizontal: '3%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
            {arrayIsEmpty(props.listComment) ?
                < View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%', paddingTop: 40, }}>
                    <Text style={{ ...fonts.type1, fontSize: 16, color: colors.default }}>
                        No review
                    </Text>
                </View>
                :
                <View>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10, width: '20%' }}>
                            <Text style={{ ...fonts.type1, fontSize: 26, fontWeight: 'bold' }}>
                                {props.avgRating}
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
                                        ({props.ratingList.fiveStar > 99 ? '99+' : props.ratingList.fiveStar})
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
                                        ({props.ratingList.fourStar > 99 ? '99+' : props.ratingList.fourStar})
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
                                        ({props.ratingList.threeStar > 99 ? '99+' : props.ratingList.threeStar})
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
                                        ({props.ratingList.twoStar > 99 ? '99+' : props.ratingList.twoStar})
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
                                        ({props.ratingList.oneStar > 99 ? '99+' : props.ratingList.oneStar})
                                    </Text>
                                </View>
                            </View>



                        </View>
                    </View>
                    <View>
                        {renderComment}

                    </View>
                </View>
            }
        </ScrollView >

    )

}

export default CommentList

const styles = StyleSheet.create({})
