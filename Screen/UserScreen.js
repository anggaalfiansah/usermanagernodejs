/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {
  Button,
  Content,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Picker,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, ScrollView} from 'react-native';

const UserScreen = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Filter, setFilter] = useState('');
  const [Keyword, setKeyword] = useState('');

  const url = 'https://tugas-8-services-jc.herokuapp.com/users/';

  useEffect(() => {
    getDataFromServices();
  }, []);

  const getDataFromServices = () => {
    axios
      .get(url)
      .then((response) => {
        // handle success
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const updateData = () => {
    axios
      .get(url)
      .then((response) => {
        // handle success
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const getDataFromSearch = () => {
    axios
      .get(url + Filter + Keyword)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const editButton = (items) => {
    navigation.navigate('Form', {data: items});
  };

  const deleteButton = (id) => {
    axios
      .delete(url + id)
      .then((response) => {
        // handle success
        console.log(response);
        // eslint-disable-next-line no-alert
        alert(`Data dengan Id ${id} sudah di hapus`);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <ScrollView style={{paddingHorizontal: 15}}>
      <Content>
        <Item regular style={{marginVertical: 5}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select your SIM"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={Filter}
            onValueChange={(value) => setFilter(value)}>
            <Picker.Item label="Select Filter" value="" />
            <Picker.Item label="Username" value="username/" />
            <Picker.Item label="Email" value="email/" />
            <Picker.Item label="Phone" value="phone/" />
            <Picker.Item label="Address" value="address/" />
          </Picker>
        </Item>
        <Item regular style={{marginVertical: 5}}>
          <Input
            placeholder="Insert Keyword"
            Value={Keyword}
            onChangeText={(value) => setKeyword(value)}
          />
        </Item>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 2,
          }}>
          <Button
            style={{width: '75%'}}
            block
            primary
            onPress={getDataFromSearch}>
            <Text>Search</Text>
          </Button>
          <Button style={{width: '20%'}} block success onPress={updateData}>
            <Text>Refresh</Text>
          </Button>
        </View>
      </Content>
      <Item style={{marginTop: 20, alignSelf: 'center'}}>
        <Text>Total User : {Data.length}</Text>
      </Item>
      <Content style={{marginTop: 20}}>
        <List>
          {Data.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    width: '75%',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text>Username : {item.username}</Text>
                  <Text>Email : {item.email}</Text>
                  <Text>Phone :{item.phone}</Text>
                  <Text>Address : {item.address}</Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Button
                    block
                    light
                    onPress={() => editButton(item)}
                    style={{marginVertical: 5}}>
                    <Text>Edit</Text>
                  </Button>
                  <Button block danger onPress={() => deleteButton(item._id)}>
                    <Text>Delete</Text>
                  </Button>
                </View>
              </ListItem>
            );
          })}
        </List>
      </Content>
      <Text
        style={{
          paddingHorizontal: 15,
          fontSize: 10,
          color: 'red',
          marginVertical: 10,
          textAlign: 'justify',
        }}>
        Note : Jika ingin delete data silahkan klik button "Delete" pada salah
        satu user dan jangan lupa klik button refresh untuk memperbarui list.
        Untuk memperbarui list seperti awal bisa dengan mengklik button
        "Refresh" atau Fileter di buat default dan keyword dikosongkan lalu klik
        button "Search"
      </Text>
    </ScrollView>
  );
};

export default UserScreen;
