import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class receiverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      receiverId      : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      bookName        : this.props.navigation.getParam('details')["book_name"],
      reason_for_requesting     : this.props.navigation.getParam('details')["reason_to_request"],
      receiverName    : '',
      receiverContact : '',
      receiverAddress : '',
      receiverRequestDocId : ''
    }
  }



getreceiverDetails(){
  db.collection('users').where('email_id','==',this.state.receiverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        receiverName    : doc.data().first_name,
        receiverContact : doc.data().contact,
        receiverAddress : doc.data().address,
      })
    })
  });

  db.collection('requested_books').where('request_id','==',this.state.requestId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({receiverRequestDocId:doc.id})
   })
})}

updateBookStatus=()=>{

}



componentDidMount(){
  this.getreceiverDetails()
}


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>

        <View style={{flex:0.3}}>
          <Card title={"Book Information"} titleStyle= {{fontSize : 20}}>
            
          </Card>
        </View>

        <View style={{flex:0.3}}>
          <Card title={"receiver Information"} titleStyle= {{fontSize : 20}}>
              
          </Card>
        </View>

        <View style={styles.buttonContainer}>
         
        </View>
        
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})
