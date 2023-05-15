// import { View, Text } from 'react-native'
// import React from 'react'
import { View, Text,Modal } from 'react-native'
import { StyleSheet,Alert, Dimensions,PermissionsAndroid,ToastAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import React,{useEffect,useState} from 'react'
import {DocumentView, RNPdftron, Config} from 'react-native-pdftron';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
export default function Wordtopdf() {
  // const source = require('./sample.pdf');
  const [downloadedSucess, setDownloadedSucess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPdf, setShowPdf] = useState(false)
  const [pdfLoc, setPdfLoc] = useState('')
  const source = {uri:pdfLoc};
    useEffect(() => {
       requestStoragePermission();  
    }, [])

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
          // downloadFile();
  
        } else {
         ToastAndroid.show('storage permission denied',100);
        }
      } catch (err) {
  
        console.warn(err);
      }
    };
   const convert= (dd)=>{
    setDownloadedSucess(false);
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
    }).catch((error) => {
      console.log(error)
    });

    }
    const downloadFile = async () => {
      // alert("Download")
      const localFilePath =pdfLoc; // the path of our localfile stored inside app's private storage
      // console.log(localFilePath)
      const downloadsFolderPath= RNFetchBlob.fs.dirs.DownloadDir; //the folder location where we will be downaloading our file
      const fileName = `Converted_PDF${new Date().getMilliseconds()}.pdf`; //file name of our downloaded pdf
      
      const downloadedFilePath = `${downloadsFolderPath}/AIO/${fileName}`; 
      console.log(downloadedFilePath,"vikas");
      if(downloadedSucess){
        console.log("downloadedFilePath")
        // openDownloadedFile(downloadedFilePath,fileName)
      }else{
        
        setModalVisible(true)
    try {
      // RNFS.mkdir()
      RNFS.mkdir(`file://${downloadsFolderPath}/AIO`)
      .then((result) => {
        console.log('result', result)
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
                  // console.log(localDownloadedFile,"gsrgr",downloadedFilePath)
                  // ToastAndroid.show(`File Saved Succesfully\n Under Downloads/${fileName}`,100)
                  // openDownloadedFile(downloadedFilePath,fileName)
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

  return (
    <SafeAreaProvider style={{marginTop:30}}>
      <Text onPress={async()=>{
let data=await DocumentPicker.getDocumentAsync()
let k=data.uri.toString()
k=k.replace("file:///","")
convert(k)
      }} style={styles.text}>Pick</Text>
      
      <Modal visible={showPdf}
          transparent={true}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setShowPdf(!showPdf);
          }}>
            <View style={{backgroundColor:'red',flex:1}}>
            {/* <DocumentView
  document={pdfLoc}
/> */}
 <Pdf
 trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
      </Modal>
      <Text style={styles.text} onPress={()=>{convert()}}>Conv</Text>
      <Text style={styles.text} onPress={()=>{
        // setShowPdf(true)
        downloadFile()
        }}>Cofbfnv</Text>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
  text:{
    fontSize:25,
    padding:10,
    margin:20
  }
});