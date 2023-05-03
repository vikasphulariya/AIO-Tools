import { StyleSheet } from "react-native";
import Splash from "./Splash";

const Homestyle = StyleSheet.create({
    icons: {
        width: 70,
        height: 70,
        margin: 10,
        // borderRadius: 12,
    },
    splashview: {
        backgroundColor: "black", 
        flex: 1, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    },
    Splashicon:{padding:10,width:250,height:241},
    Splashtitle:{
        margin: 10,
        fontSize:25.0,
        fontFamily: 'Supercell-Magic Regular'
    },
    Splashlogo:{
        alignItems:'center',
    },
    footer:{
        position:"absolute",
        bottom:30,
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center'
    },
    footertext:{
        fontSize:20,
        fontFamily: 'Supercell-Magic Regular'
    }

})

export { Homestyle }
