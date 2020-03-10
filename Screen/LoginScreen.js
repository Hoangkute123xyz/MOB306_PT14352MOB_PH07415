import React,{useState} from 'react';
import { View, StyleSheet} from 'react-native';
import { Toolbar } from '../Components/Navigation';
import { EditText, MyButton } from '../Components/Compat';


export function Login({navigation}){
    const [Name, setName] = useState("");
    const [Age, setAge] = useState(0);
    const [isDisable,setDisable] = useState(true)
    return(
        <View style={style.parent}>
            <Toolbar title="Đăng nhập"/>
            <View style={style.panelContent}>
                <EditText hint="Tên" drawable={require("../Resouces/img/001-user.png")} onValueChange={(text) =>{
                            setName(text)
                            if(Name.length>0 && Age>=18){
                            setDisable(false)
                        } else {
                            setDisable(true)
                        }
                    }}/>
                <EditText keyboardType="number-pad" drawable={require("../Resouces/img/002-age.png")} hint="Tuổi" onValueChange={(text)=>{
                            
                        if(Name.length>0 && text>=18){
                            setDisable(false)
                        } else {
                            setDisable(true)
                        }
                    }}/>
                <MyButton disabled={isDisable} title="Vào đọc truyện" onPress={()=>{
                        navigation.replace("Home",{name:Name,age:Age} );
                    }}/>
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
})