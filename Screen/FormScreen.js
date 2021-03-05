/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {Button, H1, Input, Item, Textarea, View, Text} from 'native-base';
import React, {useState, useEffect} from 'react';

const FormScreen = ({route, navigation}) => {
  const [ID, setID] = useState(null);
  const [Username, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  console.log(route.params);

  useEffect(() => {
    if (route.params === undefined) {
      return;
    } else {
      setID(route.params.data._id);
      setUsername(route.params.data.username);
      setEmail(route.params.data.email);
      setPhone(route.params.data.phone);
      setAddress(route.params.data.address);
    }
  }, [route]);

  const url = 'https://tugas-8-services-jc.herokuapp.com/users/';

  const submitData = () => {
    if (ID === null) {
      axios
        .post(url, {
          username: Username,
          email: Email,
          phone: Phone,
          address: Address,
        })
        .then((response) => {
          console.log(response);
          // eslint-disable-next-line no-alert
          alert('Submit Data Berhasil');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(url + ID, {
          username: Username,
          email: Email,
          phone: Phone,
          address: Address,
        })
        .then((response) => {
          console.log(response);
          // eslint-disable-next-line no-alert
          alert('Update Data Berhasil');
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setID(null);
    setUsername();
    setEmail();
    setPhone();
    setAddress();
  };

  const resetButton = () => {
    if (ID !== null) {
      return (
        <Button
          style={{marginVertical: 10}}
          block
          light
          onPress={() => {
            setID(null);
            setUsername();
            setEmail();
            setPhone();
            setAddress();
          }}>
          <Text>Reset Form</Text>
        </Button>
      );
    }
  };

  return (
    <View style={{paddingHorizontal: 10, paddingTop: 20}}>
      <H1 style={{textAlign: 'center', fontWeight: 'bold'}}>
        Form {ID !== null ? 'Update' : 'Tambah'} Data
      </H1>
      <Item regular style={{marginVertical: 5}}>
        <Input
          placeholder="Insert Username"
          value={Username}
          onChangeText={(value) => setUsername(value)}
        />
      </Item>
      <Item regular style={{marginVertical: 5}}>
        <Input
          placeholder="Insert Email"
          value={Email}
          onChangeText={(value) => setEmail(value)}
        />
      </Item>
      <Item regular style={{marginVertical: 5}}>
        <Input
          placeholder="Insert Phone"
          value={Phone}
          onChangeText={(value) => setPhone(value)}
        />
      </Item>
      <Item regular style={{marginVertical: 5}}>
        <Textarea
          placeholder="Insert Address"
          rowSpan={5}
          value={Address}
          onChangeText={(value) => setAddress(value)}
        />
      </Item>
      <Button block primary onPress={submitData}>
        <Text>Submit</Text>
      </Button>
      {resetButton()}
      <Text style={{fontSize: 10, color: 'red', marginTop: 20, textAlign: 'justify'}}>Note : Jika ingin update data silahkan pergi ke home dan klik button "Edit" pada salah satu user. Jika ingin membatalkan update dan ingin menambah data silahkan klik button "Reset Form".</Text>
    </View>
  );
};

export default FormScreen;
