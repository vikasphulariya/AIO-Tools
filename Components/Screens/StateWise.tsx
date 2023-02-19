import { StatusBar } from 'expo-status-bar';
import { FlatList, Modal, StyleSheet, Text, TextInput, View,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import Inidividual from './Inidividual';
import React, { useState, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context/lib/typescript/SafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StateWise({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    // const [first, setfirst] = useState(second)
    const [covidData, setCovidData] = useState([])
    const [covidDataCpy, setCovidDataCpy] = useState([])
    const [SortD, setSortD] = useState('States')
    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        handledemp()

    }, [])


    const handledemp = async () => {
        covidData.splice(0, covidData.length)
        covidDataCpy.splice(0, covidDataCpy.length)
        console.log('esd')
        const data = await axios.get("https://www.mygov.in/sites/default/files/covid/covid_state_counts_ver1.json")
        const vacindata = await axios.get("https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json")
        // cosnt 
        const tempvacin = vacindata.data.vacc_st_data;
        // console.log(vacindata.data.vacc_st_data);
        // const temp=[...covidData,data.data.covid_portal_url]
        const state = data.data["Name of State / UT"]
        const death = data.data["Death"]
        const total = data.data["Total Confirmed cases"]
        const active = data.data["Active"]
        const cured = data.data["Cured/Discharged/Migrated"]

        let a = 0
        let totalCases = 0
        let activeCases = 0
        let curedCases = 0
        let totaldeaths = 0
        let totalVacindata = 0
        for (const key in state) {
            let a = 0
            while (state[key] != tempvacin[a].covid_state_name) {
                a++
            }
            totalCases = totalCases + parseInt(total[key])
            activeCases = activeCases + parseInt(active[key])
            curedCases = curedCases + parseInt(cured[key])
            totalVacindata = totalVacindata + parseInt(tempvacin[a].total_doses)
            totaldeaths = totaldeaths + parseInt(death[key])
            const temp = {
                State: state[key],
                Total: total[key],
                Death: death[key],
                Active: active[key],
                Cured: cured[key],
                CuRatio: (cured[key] / total[key] * 100).toFixed(2),
                DeRatio: (death[key] / total[key] * 100).toFixed(2),
                Vaccin: tempvacin[a].total_doses
            }
            // console.log(temp);
            covidData.push(temp);
            covidDataCpy.push(temp);

        }
        console.log("Data Feteched", totaldeaths);
        setFetched(true);
    }



    const Search = (SearchTxt) => {
        if (SearchTxt != '') {

            // setCovidData(covidDataCpy)
            const tempData = covidDataCpy.filter(item => {
                return item.State.toLowerCase().indexOf(SearchTxt.toLowerCase()) > -1;

                // const tempItem=item.State?item.State.toUpperCase():''.toUpperCase();
                // const itemData=SearchTxt.toUpperCase()
            })
            setCovidData(tempData)
        }
        else {
            setCovidData(covidDataCpy)
        }
    }

    return (

        <SafeAreaView style={{ height: "100%" }} >
            <View style={styles.container}>
                {/* <Text onPress={()=>{console.log(covidData)}}>Open up App.js to start working on your app!</Text> */}
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', elevation: 10 }}>

                    <Text style={{ fontSize: 24, padding: 10 }}>State Wise covid Data</Text>
                    <View style={{ marginLeft: 30, flexDirection: 'row', width: '95%', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <TextInput placeholder='Search For State'
                            onChangeText={(value) => {
                                Search(value)
                            }} style={styles.search}></TextInput>

                            <TouchableOpacity onPress={()=>{
                                setModalVisible(true)
                            }}>

                            <Text style={{ backgroundColor: '#0366fc', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, fontWeight: '900', fontSize: 18, elevation: 10 }}>Sort By</Text>
                            </TouchableOpacity>

                    </View>
                </View>
                <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>

        <View style={{flex:1}} >
            </View>
            </TouchableWithoutFeedback>
          <View style={{position:'absolute',right:10,top:100}} >
            {/* <Text style={styles.modalBtn}>Sort By</Text> */}
            <TouchableOpacity
              onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='States'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.State>b.State?1:-1)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('States')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>a.State<b.State?1:-1)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('uStates')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>State Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='Confirmed'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.Total-b.Total)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('Confirmed')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.Total-a.Total)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unConfiremed')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Confirmed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='Active'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.Active-b.Active)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('Active')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.Active-a.Active)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unActive')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='Deaths'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.Death-b.Death)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('Deaths')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.Death-a.Death)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unDeaths')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Deaths</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='CuRatio'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.CuRatio-b.CuRatio)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('CuRatio')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.CuRatio-a.CuRatio)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unCuRatio')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Cure Ratio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='DeRatio'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.DeRatio-b.DeRatio)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('DeRatio')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.DeRatio-a.DeRatio)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unDeRatio')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Death Ratio</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {
                // console.log(SortD=='Confirmed')
                if(SortD!='Vaccin'){
                // console.log("df")
                let tempdata=covidData.sort((a,b)=>a.Vaccin-b.Vaccin)
                setCovidData(tempdata)
                setModalVisible(!modalVisible)
                setSortD('Vaccin')}
                else{
                    // console.log("dff")
                    let tempdata=covidData.sort((a,b)=>b.Vaccin-a.Vaccin)
                    setCovidData(tempdata)
                    setModalVisible(!modalVisible)
                    setSortD('unVaccin')}
                    }
                
                
                }>
              <Text style={styles.modalBtn}>Vaiccination</Text>
            </TouchableOpacity>
        </View>
        
      </Modal>
                {/* <View>  */}

                {fetched ?
                    // <ScrollView>

                    // </ScrollView>
                    <View style={{ height: '84%', marginTop: 5 }}>

                        <FlatList
                            style={{ width: "100%" }}
                            data={covidData}
                            renderItem={(item, index) => {
                                return (
                                    // console.log('covidData'),
                                    // <View style={{backgroundColor:'orange',height:'80%'}}>
                                    // <Text>{item.item.State}</Text>
                                    <Inidividual data={item.item} />
                                    // </View>
                                )
                            }} />
                    </View>
                    : <Text style={{ marginVertical: 200, fontSize: 20 }}> Please Wait Loading Data Make Sure Internet IS Working</Text>}

                {/* </View> */}
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, paddingTop: 3 }}>

                        Made With ❤️ By Vikas Phulriya
                    </Text>
                </View>

                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth :20,
        backgroundColor: '#f5f5f5',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: StatusBar.currentHeight,
        // justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // marginBottom: 72
    },
    search: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#c0c0c0',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '70%',
        elevation: 10,
    },
    modalBtn:{
        margin:1,
        borderColor: '#c0c0c0',
        borderWidth:1,
        width:'auto',
        backgroundColor:'#fff',
        borderRadius:10,
        paddingHorizontal:10,
        width:110,
    },
});
