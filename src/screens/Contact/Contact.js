import React, {Component} from 'react';
import {Header} from 'native-base'
import SafeAreaView from 'react-native-safe-area-view';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Database} from '../../Config/Firebase';

export default class Contact extends Component {
  constructor(props) {
    super(props);
  }
  // static navigationOptions = {
  //   header: null,
  // };
  state = {
    userList: [],
    refreshing: false,
    uid: '',
  };
  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid, refreshing: true});
    await Database.ref('/user').on('child_added', data => {
      let person = data.val();
      if (person.id != uid) {
        this.setState(prevData => {
          return {userList: [...prevData.userList, person]};
        });
        this.setState({refreshing: false});
      }
    });
  };

  renderItem = ({item}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
           onLongPress={() => {this.props.navigation.navigate('Profila', {item})}}
          >
          <View style={styles.row}>
            <Image source={{uri: item.photo}} style={styles.pic} />
            <View>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.nameTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                {/* {item.status == 'Online' ? (
                  <Text style={styles.statusol}>{item.status}</Text>
                ) : (
                  <Text style={styles.status}>{item.status}</Text>
                )} */}
              </View>
              <View style={styles.msgContainer}>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  render() {
    return (
      <SafeAreaView navigation={this.props.navigation} style={styles.container}>
        
        {this.state.refreshing === true ? (
          <ActivityIndicator
            size="large"
            color="#05A0E4"
            style={{marginTop: 150}}
          />
        ) : (
          <FlatList
            data={this.state.userList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEBE8'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  status: {
    fontWeight: '200',
    color: '#ccc',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statusol: {
    fontWeight: '400',
    color: '#f48023',
    fontSize: 12,
    marginLeft: 15,
  },
  email: {
    fontWeight: '400',
    color: '#f48023',
    fontSize: 12,
  },
});
