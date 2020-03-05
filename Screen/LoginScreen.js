import React,{useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import { Toolbar } from '../Components/Navigation';
import { EditText } from '../Components/Compat';
import {TouchableOpacity } from 'react-native-gesture-handler';


export function Login({navigation}){
    const [Name, setName] = useState("");
    const [Age, setAge] = useState(0);
    const [isDisable,setDisable] = useState(true)
    return(
        <View style={style.parent}>
            <Toolbar title="Đăng nhập"/>
            <View style={style.panelContent}>
                <EditText placeHolder="Tên" onValueChange={(text) =>{
                            setName(text)
                            if(Name.length>0 && Age>=18){
                            setDisable(false)
                        } else {
                            setDisable(true)
                        }
                    }}/>
                <EditText keyboardType="number-pad" placeHolder="Tuổi" onValueChange={(text)=>{
                            
                        if(Name.length>0 && text>=18){
                            setDisable(false)
                        } else {
                            setDisable(true)
                        }
                    }}/>
                <TouchableOpacity disabled={isDisable} style={isDisable?style.buttonStyleDisable:style.buttonStyle} onPress={()=>{
                        navigation.replace("Home",{name:Name,age:Age} );
                    }}>
                    <Text style={style.textTouchable}>Vào đọc truyện</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    parent:{
        flex:1,
        backgroundColor:"#ff5722",
    },
    panelContent:{
        padding:32,
        flex:1,
        backgroundColor:"#fff",
        borderRadius:20,
    },
    buttonStyle:{
        margin:8,
        backgroundColor:"#ff5722",
        justifyContent:"center",
        alignItems:"center",
        padding:10,

        shadowOffset:{height:10,width:0},
        shadowColor:"#2AC062",
        shadowOpacity:0.4,
        borderRadius:20
    },
    buttonStyleDisable:{
        margin:8,
        backgroundColor:"gray",
        justifyContent:"center",
        alignItems:"center",
        padding:10,

        shadowOffset:{height:10,width:0},
        shadowColor:"#2AC062",
        shadowOpacity:0.4,
        borderRadius:20
    },
    textTouchable:{
        color:"#fff",
        fontWeight:"bold"
    }
})