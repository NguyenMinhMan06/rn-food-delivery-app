import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const About = () => {
    return (
        <SafeAreaView>
            <View style={{ padding: '3%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,

                        color: '#324b68'
                    }}>
                        Any problems please contact:{" "}
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            +84 984 277 152
                        </Text>
                    </Text>
                </View>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,

                        color: '#324b68'
                    }}>
                        Or send email at:{" "}
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            mannm06@gmail.com
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default About

const styles = StyleSheet.create({})
