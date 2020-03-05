import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Toolbar } from '../Components/Navigation';
import { ScrollView } from 'react-native-gesture-handler';

export function Story({ route, navigation }) {
    const item = route.params;

    return (
        <View style={style.parent}>
            <Toolbar title={item.name} hasBack={true} onBackPressed={() => navigation.goBack()} />
            <ScrollView>
                <View style={style.boxTitle}>
                    <Image style={style.imgThumb} source={{ uri: item.img }} />
                    <View>
                        <Text style={style.textType}>Thể loại: {item.type}</Text>
                        <Text>Số tập: {item.totalChap}</Text>
                        <Text>Tình trạng: {item.isFull ? "Hoàn thành" : "Chưa hoàn thành"}</Text>
                    </View>
                </View>
                <Text style={style.textContent}>{item.content}</Text>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    boxTitle: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.7,
        shadowOffset: { width: 2, height: 0 },
        elevation: 7,
        flexDirection: "row"
    },
    imgThumb: {
        borderRadius: 10,
        width: 80,
        height: 80,
        marginRight: 20,
    },
    textType: {
        fontStyle: "italic",
        fontWeight: "bold",
        marginBottom: 10,
    },
    textContent:{
        padding:10,
        fontSize:16,
        borderRadius:10,
        borderColor:"#000",
        borderWidth:1,
        textAlign:"justify",
        margin:10,
    }
})