import React from 'react';
import {Container, Header, Body, Title, Input} from 'native-base';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import Style from './Style';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_weight: null,
      user_height: null,
      result: null,
      calculator: false,
    };
  }

  calculate_bmi() {
    let weight = this.state.user_weight;
    let height = this.state.user_height / 100;
    let value1 = weight / height;
    let value2 = value1 / height;
    this.setState({
      result: value2,
      type: value2 > 20 && value2 < 25 ? 'normal' : 'abnormal',
      calculator: true,
    });
  }

  changeBmi(value) {
    try {
      var res = value.toString().slice(0, 5);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container style={Style.AppBackground}>
        {/* Header of app */}
        <Header style={Style.HeaderBackground}>
          <Body>
            <Title style={Style.HeaderTitle}>BMI Calculator</Title>
          </Body>
        </Header>
        {/* body of App */}
        <View style={{marginTop: 100}}>
          <View style={Style.TextinputAlign}>
            <TextInput
              style={Style.TextInputColor}
              placeholder="Enter Your Weight (Kg)"
              placeholderTextColor="#ADEFD1FF"
              keyboardType="number-pad"
              ref={ref => {
                this.user_weight = ref;
              }}
              onChangeText={user_weight => {
                this.setState({user_weight: user_weight});
              }}
              value={this.state.user_weight}
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Your Height (Cm's)"
              style={Style.TextInputColor}
              placeholderTextColor="#ADEFD1FF"
              keyboardType="number-pad"
              ref={ref => {
                this.user_height = ref;
              }}
              onChangeText={user_height => {
                this.setState({user_height: user_height});
              }}
              value={this.state.user_height}
            />
          </View>
        </View>
        {/* calculate button */}
        <View style={{marginTop: 100}}>
          <TouchableOpacity
            style={Style.CalculateButton}
            onPress={() => {
              this.calculate_bmi();
            }}>
            <Text style={Style.CalculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
        {/* modal for solution */}
        <Modal
          ref={'statusmodal'}
          position={'center'}
          backdropColor="#00000070"
          backdropOpacity={1}
          isOpen={this.state.calculator}
          onClosed={() => {
            this.setState({
              user_weight: 0,
              user_height: 0,
              result: null,
              calculator: false,
            });
          }}
          isDisabled={false}
          onOpened={() => {}}
          style={{
            height: 400,
            width: 300,
            backgroundColor: '#ADEFD1FF',
            borderRadius: 8,
          }}>
          <Container
            style={{
              backgroundColor: '#ADEFD1FF',
              borderRadius: 8,
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={Style.modalheaderText}>BMI CALCULATOR</Text>
            <Text style={Style.modalothertext}>
              A measure of body fat in person
            </Text>
            <Text style={Style.modalresult}>
              {' '}
              {this.changeBmi(this.state.result)}
            </Text>
            {this.state.type === 'normal' ? (
              <Text style={Style.modalothertext}>
                Yay! you have a normal BMI.
              </Text>
            ) : (
              <Text style={Style.modalothertext}>
                Oops! please consult a doctor.
              </Text>
            )}

            <TouchableOpacity
              style={Style.another}
              onPress={() => {
                this.setState({
                  user_weight: 0,
                  user_height: 0,
                  result: null,
                  calculator: false,
                });
              }}>
              <Text style={Style.check_another_text}>Check Another</Text>
            </TouchableOpacity>
          </Container>
        </Modal>
      </Container>
    );
  }
}
