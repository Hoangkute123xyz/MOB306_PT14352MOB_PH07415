import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import { TextInput, TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import Swipeout from 'react-native-swipeout';
export function EditText(data) {
    return (
        <TextInput style={styleEditText.editText}
            textContentType={data.inputType}
            placeholder={data.placeHolder}
            onChangeText={(text) => data.onValueChange(text)}
            keyboardType={data.keyboardType} />
    );
}
const styleEditText = StyleSheet.create({
    editText: {
        marginTop: 8,
        marginHorizontal: 16,
        borderColor: "#ff5722",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        fontWeight: "bold"
    }
});


export function StoryList(data) {
    const item = data.item;

    const showAlert = () => {
        Alert.alert(
            "Cảnh báo",
            "Bạn có muốn xóa truyện này không?",
            [
                { text: "Đồng ý", onPress: () => { data.deleteItemById(item.id) } },
                { text: "Thoát", onPress: () => { }, style: "cancel" }
            ],
            { cancelable: true }
        );
    };
    const swipeSetting = {
        autoClose: true,
        onClose: (secId, rowId, direction) => {
            
        },
        onOpen: (secId, rowId, direction) => {

        },
        right: [
            {
                text: "Xem",
                onPress: data.navigateItem,
                backgroundColor: "green"
            },
            {
                onPress: showAlert,
                text: "Xóa", type: "delete"
            },
        ],
        rowId: item.id,
        sectionId: 1
    }
    return (
        // <TouchableOpacity activeOpacity={0.7}>
        <Swipeout {...swipeSetting} style={{ marginBottom: 5, borderRadius: 10, flexDirection: "column", flex: 1,backgroundColor:"green"}}>
            <View activeOpacity={0.7} style={itemStyle.parent}>
                <Image style={itemStyle.imgThumb} source={{ uri: item.img }} />
                <View style={itemStyle.rightContent}>
                    <Text numberOfLines={2} style={itemStyle.textName}>{item.name}</Text>
                    <Text style={itemStyle.textType}>{item.type}</Text>
                    <Text style={itemStyle.textTotalChap}>Số tập: {item.totalChap}</Text>
                    <Text style={itemStyle.textFull}>{item.isFull ? "Hoàn thành" : "Chưa hoàn thành"}</Text>
                </View>
            </View>
        </Swipeout>
        // </TouchableOpacity>

    );
}
const itemStyle = StyleSheet.create({
    container: {
        // flexDirection:"row"
    },
    parent: {
        // minWidth:"90%",
        // maxWidth:"90%",
        backgroundColor: "#fff",
        flexDirection: "row",
        flex: 1,
        borderColor: "#c41c00",
        borderRadius: 10,
        borderWidth: 1,
    },
    imgThumb: {

        width: 80,
        height: 80,
        borderRadius: 20,
        margin: 10,
    },
    rightContent: {
        padding: 4
    },
    textName: {
        fontWeight: "bold",
        color: "#c41c00",
        paddingRight: 8,
    },
    textType: {
        fontStyle: "italic"
    },
    btnRight: {
        marginTop: 30,
    }
})