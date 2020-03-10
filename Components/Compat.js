import React from 'react';
import { StyleSheet, View, Image, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
export function EditText(data) {
    const styleEditText = StyleSheet.create({
        parent: {
            backgroundColor: "transparent",
            flexDirection: "row",
            marginTop: 8,
            marginHorizontal: 16,
            borderColor: "#ff5722",
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            fontWeight: "bold"
        },
        drawable: {
            marginTop: 5,
            width: data.drawable ? 20 : 0,
            height: data.drawable ? 20 : 0,
            marginRight: 8
        },
        editText: {
            flex: 1
        }
    });

    const Drawable = () => (
        data.drawable ? <Image style={styleEditText.drawable} source={data.drawable} /> : null
    );
    return (
        <View style={styleEditText.parent}>
            <Drawable />
            <TextInput editable={true} style={styleEditText.editText}
                style={{ color: "black", placeholderTextColor: "gray" }}
                value={data.value}
                placeholderTextColor = "#C0C0C0"
                textContentType={data.inputType}
                placeholder={data.hint}
                onChangeText={(text) => data.onValueChange(text)}
                keyboardType={data.keyboardType} />
        </View>

    );
}


export function TextArea(data) {
    const styleEditText = StyleSheet.create({
        parent: {
            marginTop: 8,
            marginHorizontal: 16,
            borderColor: "#ff5722",
            borderRadius: 10,
            borderWidth: 1,
            padding: 10,
            fontWeight: "bold",
            backgroundColor: "transparent"
        },
        editText: {
            textAlignVertical: "top"
        }
    });
    return (
        <View style={styleEditText.parent}>
            <TextInput
                style={{ color: "black", placeholderTextColor: "gray" }}
                editable={true}
                placeholderTextColor = "#C0C0C0"
                style={styleEditText.editText}
                value={data.value}
                multiline={true}
                numberOfLines={5}
                textContentType={data.inputType}
                placeholder={data.hint}
                onChangeText={(text) => data.onValueChange(text)}
                keyboardType={data.keyboardType} />
        </View>

    );
}


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
                onPress: showAlert,
                text: "Xóa",
                backgroundColor: "red"
            },
            {
                onPress: data.onUpdateStory,
                text: "Chỉnh sửa",
                backgroundColor: "green"
            },
        ],
        rowId: item.id,
        sectionId: 1
    }
    return (
        // <TouchableOpacity activeOpacity={0.7}>
        <Swipeout {...swipeSetting} style={{ marginBottom: 5, borderRadius: 10, flexDirection: "column", flex: 1, backgroundColor: "red" }}>
            <TouchableOpacity activeOpacity={0.7} style={itemStyle.parent} onPress={() => { data.navigateItem() }}>
                <Image style={itemStyle.imgThumb} source={{ uri: item.img }} />
                <View style={itemStyle.rightContent}>
                    <Text numberOfLines={2} style={itemStyle.textName}>{item.name}</Text>
                    <Text style={itemStyle.textType}>{item.type}</Text>
                    <Text style={itemStyle.textTotalChap}>Số tập: {item.totalChap}</Text>
                    <Text style={itemStyle.textFull}>{item.isFull ? "Hoàn thành" : "Chưa hoàn thành"}</Text>
                </View>
            </TouchableOpacity>
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
});

export function MyButton(data) {
    const style = StyleSheet.create({
        buttonStyle: {
            margin: 8,
            backgroundColor: "#ff5722",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,

            shadowOffset: { height: 10, width: 0 },
            shadowColor: "#2AC062",
            shadowOpacity: 0.4,
            borderRadius: 20
        },
        buttonStyleDisable: {
            margin: 8,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,

            shadowOffset: { height: 10, width: 0 },
            shadowColor: "#2AC062",
            shadowOpacity: 0.4,
            borderRadius: 20
        },
        textTouchable: {
            color: "#fff",
            fontWeight: "bold"
        }
    });
    return (
        <TouchableOpacity activeOpacity={0.8} disabled={data.disabled} style={data.disabled ? style.buttonStyleDisable : style.buttonStyle} onPress={data.onPress}>
            <Text style={style.textTouchable}>{data.title}</Text>
        </TouchableOpacity>
    );
}