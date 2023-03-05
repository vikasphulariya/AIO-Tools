import { View, Text,StyleSheet ,Image,Pressable, Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Tictactoe() {
    const [activePlayer, setActivePlayer] = useState('X')
    const [marker, setMarker] = useState([
        null,null,null,
        null,null,null,
        null,null,null,
        ])
    const [winnerCells, setWinnerCells] = useState([])
    const [count, setCount] = useState(0)
    // const [edi, setedi] = useState(second)
    const [editable, setEditable] = useState(true)
    const [winnerColor, setWinnerColor] = useState(null)
    
        useEffect(() => {
             const result =winner(marker)
        //    console.log("dbd")
           if(result=='X' || result=='O'){
            // console.log(winnerCells)
            setEditable(false)
            Alert.alert(`Winner is ${result}`, 'Reset Game?', [
                {
                  text: 'Yes',
                  onPress: () => gameReset(),
                },
                {
                  text: 'No',
                },
              ]);
            //    gameReset()
           }
           else{
            // console.log(result,count)
            if(count==9){
                // console.log('Draw'+count)
                alert("Draw Game")
                gameReset()
            }
           }
           }, [marker])

           const gameReset =()=>{
            setMarker([
                null,null,null,
                null,null,null,
                null,null,null,
                ]);
                setActivePlayer("X");
                setCount(0)
                setWinnerCells([])
                setEditable(true)
           }
        const mark=(postion)=>{
            if(!marker[postion] && editable){
            let temp=[...marker]
            temp[postion] =activePlayer
            setMarker(temp)
            // console.log(winnerCells)
            let tempCount =count+1
            setCount(tempCount)
            if (activePlayer=='X'){
                setActivePlayer('O')
            }
            if (activePlayer=='O'){
                setActivePlayer('X')
            }}
        }

        const winner=(squares)=>{
            const lines=[
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ];
            for(let i=0; i<lines.length; i++){
                const [a,b,c]=lines[i];
                // console.log(squares[a]);
                if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
                    let temp=[...winnerCells]
                    temp=[a,b,c]
                    console.log(squares[a])
                    setWinnerCells([a,b,c]);
                    setWinnerColor(squares[a])
                    return squares[a];
                }
            }
            return null;
           
           
            
        }
  return (
    <SafeAreaView style={{padding:10,flex:1}}>

    <View style={styles.header}>
      <Text onPress={()=>{
        console.log(winnerColor)

        // if(winnerCells.includes){
        //     console.log("vikas")
        // }
      }} style={[styles.headerTitle,{backgroundColor:activePlayer=='X'?"#ff494b":"#533a98"}]}>Player  {activePlayer}'s  Turn</Text>
    </View>

    <View style={styles.mainGame}>
        <Pressable style={[styles.cell,{borderLeftWidth:0,backgroundColor:winnerCells.includes(0)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(0)
        }}>
       {marker[0]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[0]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{backgroundColor:winnerCells.includes(1)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{  
            mark(1) 
        }}>
       {marker[1]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[1]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{backgroundColor:winnerCells.includes(2)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{  
            mark(2) 
        }}>
       {marker[2]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[2]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{borderLeftWidth:0,backgroundColor:winnerCells.includes(3)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(3)
        }}>
       {marker[3]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[3]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>
        <Pressable style={[styles.cell,{backgroundColor:winnerCells.includes(4)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(4)
        }}>
       {marker[4]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[4]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{backgroundColor:winnerCells.includes(5)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(5)
        }}>
       {marker[5]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[5]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{borderLeftWidth:0,borderBottomWidth:0,backgroundColor:winnerCells.includes(6)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(6)
        }}>
       {marker[6]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[6]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{borderBottomWidth:0,backgroundColor:winnerCells.includes(7)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
            mark(7)
        }}>
       {marker[7]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[7]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>

        <Pressable style={[styles.cell,{borderBottomWidth:0,backgroundColor:winnerCells.includes(8)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{  
            mark(8) 
        }}>
       {marker[8]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[8]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable>
        {/* <Pressable style={[styles.cell,{backgroundColor:winnerCells.includes(0)?winnerColor=='O'?"#ff494b":"#533a98":'#fff'}]} onPress={()=>{   
        }}>
       {marker[0]==='X'&& <Image style={styles.gameIcon} source={require('./Icons/Cross.png')}/>}
        {marker[0]==='O'&&  <Image style={styles.gameIcon} source={require('./Icons/o.png')}/>} 
        </Pressable> */}
    </View>
    <View >

    <Pressable onPress={()=>{
        gameReset();
    }}>
        <Image style={styles.refreshIcon} source={require("./Icons/refresh.png")}/>
    </Pressable>
    </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    header:{
        // backgroundColor:'#FFFFFF',
        alignItems: 'center',
    },
    headerTitle: {
        // backgroundColor:,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#c0c0c0',
        paddingHorizontal:15,
        paddingVertical:7,
        margin:5,
        fontWeight:'900',
        fontSize:24,
        elevation:10
    },
    gameIcon:{
        width:70,
        height:70,
    },
    cell:{
        width:100,
        height:100,
        padding:10,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0,
        // borderRadius:5
        // borderBottomWidth:2,
        // borderLeftWidth:2,
        margin:2,
        backgroundColor:'#Fff',
        borderRadius:10
    },
    mainGame:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center',
        // alignContent:'center',
        alignItems: 'center',
        paddingTop:70,
        // backgroundColor:'yellow',
        flex:1
    },
    refreshIcon:{
        position: 'absolute',
        width:60,
        height:60,
        right:20,
        padding:30,
        bottom:20,
    }
})
