import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Modal, ActivityIndicator } from 'react-native';
import { Toolbar } from '../Components/Navigation';
import { ScrollView } from 'react-native-gesture-handler';

export function Story({ route, navigation }) {
    const id = route.params.id;
    const [isLoadding, setShowLoading] = useState(true);
    const [isFirst, setFirst] = useState(true);
    const [story, setStory] = useState({});
    const api = "http://5e60bfbecbbe0600146cbcf0.mockapi.io/Story";

    const fetchItem = () => {
        return fetch(
            api + "/" + id,
            {}
        ).then((response) => response.json())
            .then((responseJson) => {
                setStory(responseJson);
                setShowLoading(false);
            })
            .catch((error) => console.error(error))
    }

    if (isFirst) {
        fetchItem();
        setFirst(false);
    }


    return (
        <View style={style.parent}>
            <Toolbar title={story.name} hasBack={true} onBackPressed={() => navigation.goBack()} />
            <ScrollView>
                <View style={style.boxTitle}>
                    <Image style={style.imgThumb} source={{ uri: story.img }} />
                    <View>
                        <Text style={style.textType}>Thể loại: {story.type}</Text>
                        <Text>Số tập: {story.totalChap}</Text>
                        <Text>Tình trạng: {story.isFull ? "Hoàn thành" : "Chưa hoàn thành"}</Text>
                    </View>
                </View>
                <Text style={style.textContent}>{story.content}</Text>
            </ScrollView>
            <ShowLoading visible={isLoadding} />
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
    textContent: {
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 1,
        textAlign: "justify",
        margin: 10,
    }
});
const ShowLoading = ({ visible }) => (
    <Modal transparent={true} visible={visible} onRequestClose={() => null}>
        <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)", alignItems: "center", justifyContent: "center" }}>
            <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
                <Text style={{ fontSize: 20 }}>Xin chờ</Text>
                <ActivityIndicator size="large" />
            </View>
        </View>
    </Modal>
);