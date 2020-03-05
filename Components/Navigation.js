import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Toolbar(data) {

    if (data.hasBack) {
        return (
            <View style={styleLeft.parent}>
                <TouchableOpacity activeOpacity={0.7} onPress={data.onBackPressed}>
                    <Image style={styleLeft.imgBack} source={require("../Resouces/img/back.png")} />
                </TouchableOpacity>
                <Text style={styleLeft.title}>{data.title}</Text>
            </View>
        )
    } else {
        return (
            <View style={styleCenter.parent}>
                <Text style={styleCenter.title}>{data.title}</Text>
            </View>
        );
    }
}
const styleCenter = StyleSheet.create({
    parent: {
        height: 80,
        backgroundColor: "#ff5722",
        shadowColor: "#000000",
        shadowOpacity: 10,
    },
    title: {
        fontSize: 20,
        color: "#ffffff",
        marginTop: 35,
        textAlign: "center",
    }
});

const styleLeft = StyleSheet.create({
    parent: {
        paddingTop: 35,
        height: 80,
        backgroundColor: "#ff5722",
        shadowColor: "#000000",
        shadowOpacity: 10,
        flexDirection: "row",
        elevation: 5,
    },
    title: {
        fontSize: 20,
        color: "#ffffff",
        textAlign: "center",
    },
    imgBack: {
        width: 20,
        height: 20,
        marginLeft: 30,
        marginRight: 18,
        marginTop: 4
    }
})