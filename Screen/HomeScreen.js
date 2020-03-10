import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, Modal, ActivityIndicator, LayoutAnimation, Image, TouchableOpacity, Alert } from 'react-native'
import { Toolbar } from '../Components/Navigation'
import { EditText, StoryList, MyButton, TextArea } from '../Components/Compat';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const api = "http://5e60bfbecbbe0600146cbcf0.mockapi.io/Story";
export function Home({ route, navigation }) {
    console.log("Create");
    const { name } = route.params;
    const [list, setList] = useState([]);
    const [isFirst, setFirst] = useState(true);
    const [isLoading, setShowLoading] = useState(true);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [currentStory, setStory] = useState({});
    const fetchList = () => {
        return fetch(api,
            {}
        ).then((response) => response.json())
            .then((responseJson) => {
                console.log(`Recived ${responseJson.length} items`);
                setList(responseJson);
                setShowLoading(false);
            }).catch((error) => {
                console.error(error);
            })
    }
    if (isFirst) {
        fetchList();
        setFirst(false);
    }
    const deleteItem = (id) => {
        setShowLoading(true);
        fetch(
            `${api}/${id}`,
            { method: "DELETE" },
            {}
        ).then((response) => response.json)
            .then((responseJson) => {
                let newList = list;
                newList = newList.filter((item) => id != item.id);
                setList(newList);
                setShowLoading(false);
                console.log(`deleted item id = ${id}`);
            }).catch((error) => console.error(error));
    };



    return (
        <View style={style.parent}>
            <Toolbar title="Home" />
            <View style={style.container}>
                <MyButton title="Thêm truyện mới" onPress={() => {
                    setUpdate(false);
                    setShowModalEdit(true);
                }} />
                <Text style={style.textGreet}>Xin chào {name}, Chúc bạn đọc truyện vui vẻ!</Text>
                <FlatList style={{ marginTop: 20 }}
                    data={list}
                    renderItem={({ item }) =>
                        <StoryList deleteItemById={deleteItem}
                            navigateItem={() => navigation.navigate("Story", {id:item.id})}
                            item={item}
                            onUpdateStory={() => {
                                setUpdate(true);
                                setShowModalEdit(true);
                                setStory(item);
                            }} />
                    }
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false} />
            </View>
            <ShowLoading visible={isLoading} />
            <ModalEditStory currentStory={currentStory} isUpdate={isUpdate} onReadyAddUser={() => { setShowModalEdit(false); setShowLoading(true) }}
                onAddUser={(responseJson) => {
                    let newList = list;
                    newList = newList.concat(responseJson);
                    setList(newList);
                    setShowLoading(false);
                }} visible={isShowModalEdit} onBackPressed={() => { setShowModalEdit(false) }}
                onUpdateStory={(responseJson) => {
                    let newList = list;
                    const index = newList.findIndex(item => item.id == responseJson.id);
                    newList[index] = responseJson;
                    setList(newList);
                    setShowLoading(false);
                }} visible={isShowModalEdit} onBackPressed={() => { setShowModalEdit(false) }} 
                clear={()=>{setUpdate(false)}}/>
        </View>
    );
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "#ff5722",
    },
    container: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: "#fff",
        padding: 10
    },
    textGreet: {
        fontWeight: "bold",
        color: "#ff8a50",
        padding: 8,
        textAlign: "center",
        marginTop: 20,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 20,

        elevation: 7,
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

const ModalEditStory = (data) => {
    const [isFull, setFull] = useState(true);
    const [nameSetter, setName] = useState("");
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const [totalChap, setTotalChap] = useState("");
    const [img, setImg] = useState("");
    const radioProps = [
        { label: "Hoàn thành      ", value: true },
        { label: "Chưa hoàn thành", value: false }
    ];
    if(data.isUpdate && nameSetter.length==0){
        setName(data.currentStory.name);
        setType(data.currentStory.type);
        setContent(data.currentStory.content);
        setFull(data.currentStory.isFull);
        setImg(data.currentStory.img);
        setTotalChap(data.currentStory.totalChap);
    }

    const getData = () => {
        if (nameSetter.length == 0) {
            return (false);
        }
        if (type.length == 0) {
            return (false);
        }
        if (img.length == 0) {
            return (false);
        }
        if (totalChap.length == 0) {
            return (false);
        }
        if (content.length == 0) {
            return (false);
        }
        return (true);
    }
    const clearData=()=>{
        setName("");
        setType("");
        setContent("");
        setFull(true);
        setImg("");
        setTotalChap("");
        data.clear()
        console.log("clearData");
    }
    const handleAddStory = () => {


        if (getData()) {
            clearData();
            data.onReadyAddUser();
            fetch(
                api,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        img: img,
                        name: nameSetter,
                        type: type,
                        isFull: isFull,
                        content: content,
                        totalChap: totalChap,
                    })
                }
            ).then((response) => response.json())
                .then((responseJson) => data.onAddUser(responseJson));
        } else {
            Alert.alert(
                "Cảnh báo!",
                "Không bỏ trống trường nào!",
                [{
                    text: "OK",
                    onPress: () => console.log("abc"),
                    style: "cancel"
                }],
                { cancelable: true }
            )
        }
    }
    const handleUpdateStory = () => {

        if (getData()) {
            clearData();
            data.onReadyAddUser();
            fetch(
                `${api}/${data.currentStory.id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        img: img,
                        name: nameSetter,
                        type: type,
                        isFull: isFull,
                        content: content,
                        totalChap: totalChap,
                    })
                }
            ).then((response) => response.json())
                .then((responseJson) => data.onUpdateStory(responseJson));
        } else {
            Alert.alert(
                "Cảnh báo!",
                "Không bỏ trống trường nào!",
                [{
                    text: "OK",
                    onPress: () => console.log("abc"),
                    style: "cancel"
                }],
                { cancelable: true }
            )
        }
    }
    return (
        <Modal visible={data.visible}>
            <View>
                <View style={{ backgroundColor: "#ff5722", padding: 18, flexDirection: "row" }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{clearData(); data.onBackPressed();}}>
                        <Image style={{ width: 20, height: 20, marginTop: 10, marginRight: 10 }} source={require("../Resouces/img/back.png")} />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 20,marginTop:6 }}>{data.isUpdate ? "Cập nhật truyện" : "Thêm mới truyện"}</Text>
                </View>
                <EditText value={nameSetter} hint="Tên truyện" onValueChange={(text) => setName(text)} />
                <EditText value={type} hint="Loại truyện" onValueChange={(text) => setType(text)} />
                <EditText value={img} hint="Link Ảnh thumbnail" onValueChange={(text) => setImg(text)} />
                <EditText value={totalChap} hint="Số tập" keyboardType="number-pad" onValueChange={(text) => setTotalChap(text)} />
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <RadioForm radio_props={radioProps}
                        formHorizontal={true}
                        style={{ margin: 16 }}
                        buttonColor='#ff5722'
                        selectedButtonColor='#ff5722'
                        initial={(isFull) ? 0 : 1}
                        onPress={(value) => setFull(value)} />
                </View>
                <TextArea value={content} hint="Nội dung" onValueChange={(text) => setContent(text)} />
                <MyButton title="Lưu" onPress={data.isUpdate ? handleUpdateStory : handleAddStory} />
            </View>
        </Modal>
    );
}