import { View, Text, StyleSheet,Alert, Dimensions, PermissionsAndroid, FlatList, TouchableOpacity, Modal, Image, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Platform, NativeModules } from 'react-native';
import RNFS from 'react-native-fs';
import * as Sharing from 'expo-sharing'
import SafeAreaView from 'react-native-safe-area-view'
import RNFetchBlob from 'rn-fetch-blob';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNImageToPdf from 'react-native-image-to-pdf';
import Pdf from 'react-native-pdf';
import { v4 as uuidv4 } from 'uuid';
import Lottie from 'lottie-react-native';
import Loader from './loader';
import * as DocumentPicker from 'expo-document-picker';

import {DocumentView, RNPdftron, Config} from 'react-native-pdftron'
export default function WordPDF() {
  const [localPdfPath, setLocalPdfPath] = useState("https://www.africau.edu/images/default/sample.pdf")
  const [pdfLoc, setPdfLoc] = useState('')
  const source = { uri: pdfLoc, cache: false };
  const [imagePath, setImagePath] = useState([])
  const [showImagePath, setShowImagePath] = useState([])
  const [stateChanged, setStateChanged] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [converted, setConverted] = useState(false)
  const [image, setImage] = useState(null)
  const [localDownloadedFile, setDownloadedFile] = useState('')
  const pastedURL = "https://file-examples.com/storage/fef89aabc36429826928b9c/2017/04/file_example_MP4_480_1_5MG.mp4"
  const [modalVisible, setModalVisible] = useState(false)
  const [downloadedSucess, setDownloadedSucess] = useState(false)
const [toBeConverted, setToBeConverted] = useState('')
//This function will request for Storage permission to save Files

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader App Storage Permission',
          message:
            'Downloader App needs access to your storage ' +
            'so you can download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Downloader started')
        // alert('Downloader started')
        downloadFile();

      } else {
       ToastAndroid.show('storage permission denied',100);
      }
    } catch (err) {

      console.warn(err,"vikaa");
    }
  };

  const openDownloadedFile = (downloadedFilePath,filename) => {
    
    Alert.alert('Open Downloaded Pdf \n', `Downloads/AIO/${filename}`, [
      {
        text: 'Yes',
        onPress: () => {
          try{
            // console.log(localDownloadedFile,downloadedFilePath)
            RNFetchBlob.android.actionViewIntent(downloadedFilePath, 'application/pdf');
          }catch(e){

            console.log('File opened successfully',e)
          }
        },
      },
      {
        text: 'Dismiss',
      },
    ])
  }



  //This function will download the pdf file to phones download folder
  const downloadFile = async () => {
    // alert("Download")
    const localFilePath ="file://" +source.uri; // the path of our localfile stored inside app's private storage
    // console.log(localFilePath)
    const downloadsFolderPath= RNFetchBlob.fs.dirs.DownloadDir; //the folder location where we will be downaloading our file
    const fileName = `Converted_PDF${new Date().getMilliseconds()}.pdf`; //file name of our downloaded pdf
    
    const downloadedFilePath = `${downloadsFolderPath}/AIO/wordtopdf/${fileName}`; 
    console.log(downloadedFilePath,"vikas");
    if(downloadedSucess){
      console.log("downloadedFilePath")
      // openDownloadedFile(downloadedFilePath,fileName)
    }else{ 
      setModalVisible(true)
  try {
    // RNFS.mkdir()
    RNFS.mkdir(`file://${downloadsFolderPath}/AIO/wordtopdf`)
    .then((result) => {
      console.log('directory created succefully', result)
    })
    .catch((err) => {
                console.warn('err', err)
              })   
              RNFS.copyFile(localFilePath, downloadedFilePath)
              .then(() => {
                setDownloadedSucess(true)
                setModalVisible(false)
                console.log(downloadedFilePath)
                // console.log(localDownloadedFile,"gsrgr",downloadedFilePath)
                ToastAndroid.show(`File Saved Succesfully\n Under Downloads/${fileName}`,100)
                openDownloadedFile(downloadedFilePath,fileName)
              })
              .catch((error) => {
                setModalVisible(false)
    ToastAndroid.show('Error copying file: ', 100);
    console.log(error)
  });
} catch (error) {
  setModalVisible(false)
  ToastAndroid.show('Failed to copy file:', 100);
}
}

};


  const deleteNote = (index) => {
    // console.log(index);
    let temp = [...showImagePath];
    let temp2 = [...imagePath];
    temp.splice(index, 1);
    temp2.splice(index, 1);
    setShowImagePath(temp);
    setImagePath(temp2);
    console.log(temp2.length, " ", temp.length);
  }


  
  const convert= (dd)=>{
    setModalVisible(true)
    RNPdftron.initialize('');
    RNPdftron.getVersion().then((version) => {
      console.log("Current PDFNet version:", version);
    });
    RNPdftron.getPlatformVersion().then((platformVersion) => {
      console.log("App currently running on:", platformVersion);
    });
    RNPdftron.pdfFromOffice(dd, null).then((resultPdfPath) => {
      console.log(resultPdfPath);
      let k=resultPdfPath;
      console.log(k);
      setPdfLoc(k)
      setShowPdf(true);
      // setModalVisible(true);
      const localFilePath =k; // the path of our localfile stored inside app's private storage
      // console.log(localFilePath)
      const downloadsFolderPath= RNFetchBlob.fs.dirs.DownloadDir; //the folder location where we will be downaloading our file
      const fileName = `Converted_PDF${new Date().getMilliseconds()}.pdf`; //file name of our downloaded pdf
      
      const downloadedFilePath = `${downloadsFolderPath}/AIO/wordtopdf/${fileName}`; 
      console.log(downloadedFilePath,"vikas",localFilePath);
      try {
        // RNFS.mkdir()
        RNFS.mkdir(`file://${downloadsFolderPath}/AIO/wordtopdf`)
        .then((result) => {
          console.log('direcotry creadety success', result)
        })
        .catch((err) => {
                    console.warn('err', err)
                  })
                  
                  RNFS.copyFile(localFilePath, downloadedFilePath)
                  .then(() => {
                    setDownloadedSucess(true)
                    setModalVisible(false)
                    let k='file://'+downloadedFilePath
                    setPdfLoc(downloadedFilePath)
                    console.log(downloadedFilePath)
                    setShowPdf(true)
                    setConverted(true)
                    // console.log(localDownloadedFile,"gsrgr",downloadedFilePath)
                    // ToastAndroid.show(`File Saved Succesfully\n Under Downloads/${fileName}`,100)
                    // openDownloadedFile(downloadedFilePath,fileName)
                  })
                  .catch((error) => {
                    setModalVisible(false)
        ToastAndroid.show('Error copying file: ', 100);
        console.log(error,"dft")
      });
    } catch (error) {
      setModalVisible(false)
      ToastAndroid.show('Failed to copy file:', 100);
    }
      setConverted(true);

    }).catch((error) => {
      console.log(error)
    });

    }
  const myAsyncPDFFunction = async () => {
    try {
      const options = {
        imagePaths: imagePath,
        name: 'Converted.pdf',
        maxSize: { // optional maximum image dimension - larger images will be resized
            width: 900,
            height: Math.round(Dimensions.get('window').height /Dimensions.get('window').width * 900),
        },
        quality: .7, // optional compression paramter
      };

      const pdf = await RNImageToPdf.createPDFbyImages(options);
      setDownloadedSucess(false);
      console.log(pdf);
      setLocalPdfPath(pdf.filePath)
      setDownloadedFile(pdf.filePath)
      setConverted(true);
    } catch (e) {
      console.log(e);
    }
  }


  // This function will help to pick images from gallery
  const imagePicker = async () => {
    try{
      console.log('Loading images');
    let data=await DocumentPicker.getDocumentAsync({type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})
    setConverted(false)
    let k=data.uri.toString()
    // console.log('Loading',data)
    // console.log('Loadingd')
    k=k.replace("file:///","")
    setToBeConverted(k) //
      
  }
  catch(err){

  }
  }



  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, height: '100%' }}>
      <View>

        <Text onPress={() => {
          // setShowPdf(!showPdf);
          // console.log(source);
        }} style={styles.headerTxt}>Convert Docx To Pdf</Text>
        {toBeConverted.length==0?null:
        <TouchableOpacity style={{position:'absolute',
        borderRadius:30,right:20,top:13,elevation:15,padding:0,backgroundColor:'#fff'}}
        onPress={()=>{


          Alert.alert('Confirm', 'Clear All Images?', [
          {
            text: 'Yes',
            onPress: () => {setShowImagePath([]),
            setImagePath([]),
          setConverted(false)},
          },
          {
            text: 'No',
          },
        ]);}}>

<Image source={require("./refresh.png")} style={{height:40,aspectRatio:1,width:undefined,}}/>
        </TouchableOpacity>}

        <View style={{ marginBottom: 150, }} >

          {/* <Image source={{uri:"/data/user/0/com.vikasphulriya.AIOTools/cache/rn_image_picker_lib_temp_827f4743-d9cb-4ea7-900b-ee519dc7c1a6.jpg"}}/> */}
          {toBeConverted.length != 0 ?

            <View style={{ height:'96%' }}>
              {/* <Text>Vikas</Text> */}
              <DocumentView 
              
  document={toBeConverted}
/>
              
            </View>




            :
            <View style={{ height: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => {
                imagePicker()
              }}>

                <Image source={require("./2306065.png")} style={{ width: 200, height: 200, alignSelf: 'center',}} />
                {/* <Image source={require("./gallery.png")} /> */}
                <Text style={[styles.footerTxt, { fontSize: 22,alignSelf:'center' }]}>
                  Import Document</Text>
              </TouchableOpacity>

            </View>
          }




        </View>
        <Modal visible={showPdf}
          transparent={true}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setShowPdf(!showPdf);
          }}>
          <View style={styles.centeredView}          >
            <View style={styles.modalView}>
              <Text onPress={()=>{
                // setModalVisible(true)
              }} style={styles.convertedTxt}>{!converted ? 'Converting  To PDF' : `Converted PDF`}</Text>
            <Text style={{position:'absolute',fontSize:35,fontWeight:'900',top:1,right:20,color:'red'}} onPress={()=>{
              setShowPdf(false)
            }}>×</Text>
            {/* <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
              <View style={styles.container}>

                {/* <Text onPress={()=>{imagePicker()}}>Image</Text> */}
                {converted ?

                  <Pdf
                    trustAllCerts={false}
                    source={source}
                    // onLoadComplete={(numberOfPages, filePath) => {
                    //   console.log(`Number of pages: ${numberOfPages}`, filePath);

                    // }}
                    // onPageChanged={(page, numberOfPages) => {
                    //   console.log(`Current page: ${page}`);
                    // }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    onPressLink={(uri) => {
                      console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} />
                  :
                  <Lottie source={require('./98194-loading.json')} autoPlay />
                  // null
                  }

              </View>
              {converted?
              <View style={{
                borderRadius: 50, padding: 0, position: 'absolute',
                bottom: 90,flexDirection:'row',width: '100%',backgroundColor:'red',
              }}>
                <TouchableOpacity style={{position:'absolute',left:20,backgroundColor:'#fff',alignContent:'center',justifyContent:'center',padding:8,borderRadius:40}}
                 onPress={() => { 
                  console.log(pdfLoc)
                Sharing.shareAsync(`file://${pdfLoc}`)
              // RNFetchBlob.android.actionViewIntent(localDownloadedFile, 'application/pdf');
            }} >

                  <Image source={require('./shar.png')} style={[,{aspectRatio:1,height:50,}]} />
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',right:20}} onPress={() => { 
                  // requestStoragePermission()
                  RNFetchBlob.android.actionViewIntent(pdfLoc, 'application/pdf');
                 }} >

                  <Image source={require('./vision.png')} style={[styles.icon,{}]} />
                </TouchableOpacity>
              </View>
                 :null}

            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.ConvertImageButton}>


        <TouchableOpacity 
          style={[styles.converPdf, { backgroundColor: toBeConverted.length != 0 ? '#27f26b' : "#c5c7c9" }]
          } 
          onPressIn={() => {
            if(toBeConverted.length!=0){
              setShowPdf(true)
              // setConverted(false)
            }else{
              ToastAndroid.show("Please Import\nDocument First",100)
            }
          }}
          onPress={() => {
            if(!converted && toBeConverted.length!=0){
              console.log("Please Import");
              convert(toBeConverted)
            }
            
          }}>
          <Text style={styles.footerTxt}>Convert To Pdf</Text>
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtn} onPress={() => { imagePicker() 
        setConverted(false)}}>

          {/* <View style={styles.addImageButton}> */}

          <Text style={styles.footerTxt} >+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // marginBottom: 100,
    // height:'100%'
    // marginTop: 25,
    borderRadius: 15,
    width: "100%",
    alignSelf: 'center',
    height: '100%',
    flexWrap: 'wrap',
  },
  pdf: {
    flex: 1,
    // backgroundColor:,
    // marginBottom: 100,
    width: "100%",
    paddingHorizontal: -4,
    // width:'90%',
    height: Dimensions.get('window').height,
    // marginHorizontal:1,
    // borderRadius:10,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  ConvertImageButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-around',
    width: '100%'
  },
  footerTxt: {
    fontWeight: 'bold',
    fontSize: 16
  }, addbtn: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    elevation: 10
  },
  headerTxt: {
    fontSize: 24,
    margin: 15,
    alignSelf: 'center',
  },
  converPdf: {
    paddingVertical: 10,
    // width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    elevation: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    flexWrap: 'wrap',
    // backgroundColor:"rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: '#f5f5f5',
    margin: "2%",
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '96%',
    height: '94%',
    alignContent: 'center',
    alignItems: 'center',
  },
  convertedTxt: {
    fontSize: 24,
    marginBottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  icon: {
    
    // backgroundColor: '#fff',
    borderRadius:50,
    width: 70,
    height: 70,
    aspectRatio: 3 / 3
  }
});