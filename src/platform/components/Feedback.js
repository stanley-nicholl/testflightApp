import React, { Component } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native'
import { HEROKU } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Card, CardSection, BlueButton, ShakeMessage } from './common'
import { painGainInputUpdate, simpleInputUpdate } from '../../actions'

class Feedback extends Component {
  state = {
    painGain: null,
    simple: null,
    changeRequest: 'While it is simple and our users will love it, we need to enable sorting capabilities that can extend across the entire collection.',
    nextSteps: 'Make the updates and shoot me the new experience next week',
    showModal: false
  }

  async handleSubmit() {
    const { painGain, simple, changeRequest, nextSteps } = this.state
    if(painGain === null || simple === null || !changeRequest || !nextSteps){
      this.setState({ showModal: !this.state.showModal })
      return null
    }

    const { prototype_id, id } = this.props.testPilot
    const tempUser_id = { user_id: id}
    const { user_id } = tempUser_id
    const body = { prototype_id, user_id, painGain, simple, changeRequest, nextSteps }
    await fetch(`${HEROKU}/prototypes/reviews`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(result => {
        Actions.thankYouSection()
      })
  }

  onOk() {
    this.setState({ showModal: !this.state.showModal })
  }

  updateLocalState(input) {
    this.setState(input)
  }

  renderGainYesThumbs() {
    const{ yesThumbImageStyle } = styles
    if(this.state.painGain){
      return (
        <TouchableWithoutFeedback onPress={() => this.updateLocalState({ painGain: true })}>
          <Image
            style={yesThumbImageStyle}
            source={require('../../images/thumb-blue.png')}
          />
        </TouchableWithoutFeedback>
      )
    }else{
        return (
          <TouchableWithoutFeedback onPress={() => this.updateLocalState({ painGain: true })}>
            <Image
              style={yesThumbImageStyle}
              source={require('../../images/thumb-white.png')}
            />
          </TouchableWithoutFeedback>
        )
      }
    }

  renderGainNoThumbs() {
    const { noThumbImageStyle } = styles
    if(this.state.painGain === false){
      return (
        <TouchableWithoutFeedback onPress={() => this.updateLocalState({ painGain: false })}>
          <Image
            style={noThumbImageStyle}
            source={require('../../images/thumb-blue.png')}
          />
        </TouchableWithoutFeedback>
      )
    }else{
        return (
          <TouchableWithoutFeedback onPress={() => this.updateLocalState({ painGain: false })}>
            <Image
              style={noThumbImageStyle}
              source={require('../../images/thumb-white.png')}
            />
          </TouchableWithoutFeedback>
        )
      }
    }

    renderSimpleYesThumbs() {
      const{ yesThumbImageStyle } = styles
      if(this.state.simple){
        return (
          <TouchableWithoutFeedback onPress={() => this.updateLocalState({ simple: true })}>
            <Image
              style={yesThumbImageStyle}
              source={require('../../images/thumb-blue.png')}
            />
          </TouchableWithoutFeedback>
        )
      }else{
          return (
            <TouchableWithoutFeedback onPress={() => this.updateLocalState({ simple: true })}>
              <Image
                style={yesThumbImageStyle}
                source={require('../../images/thumb-white.png')}
              />
            </TouchableWithoutFeedback>
          )
        }
      }

    renderSimpleNoThumbs() {
      const { noThumbImageStyle } = styles
      if(this.state.simple === false){
        return (
          <TouchableWithoutFeedback onPress={() => this.updateLocalState({ simple: false })}>
            <Image
              style={noThumbImageStyle}
              source={require('../../images/thumb-blue.png')}
            />
          </TouchableWithoutFeedback>
        )
      }else{
          return (
            <TouchableWithoutFeedback onPress={() => this.updateLocalState({ simple: false })}>
              <Image
                style={noThumbImageStyle}
                source={require('../../images/thumb-white.png')}
              />
            </TouchableWithoutFeedback>
          )
        }
      }

  render() {
    const { pageStyle, titleStyle, sectionStyle, thumbTextStyle, textInputStyle, smallTextInputStyle } = styles

    return (
      <View style={pageStyle}>
        <ScrollView>
          {/* <Text style={titleStyle}>TELL US WHAT YOU THINK</Text> */}
          <View style={sectionStyle}>
            <Text style={thumbTextStyle}>This experience provides a gain or removes a pain for the target user(s):</Text>
            <View style={{ flexDirection: 'row'}}>
              {this.renderGainYesThumbs()}
              {this.renderGainNoThumbs()}
            </View>
          </View>
          <View style={sectionStyle}>
            <Text style={thumbTextStyle}>This experience was simple and intuitive for our target users(s) to accomplish their goal:</Text>
            <View style={{ flexDirection: 'row' }}>
              {this.renderSimpleYesThumbs()}
              {this.renderSimpleNoThumbs()}
            </View>
          </View>
          <View style={sectionStyle}>
            <Text style={thumbTextStyle}>What would you change about this experience?</Text>
            <TextInput
              style={textInputStyle}
              multiline={true}
              numberOfLines={5}
              editable={true}
              maxLength={240}
              onChangeText={(text) => this.setState({ changeRequest: text })}
              value={this.state.changeRequest}
            />
          </View>
          <View style={sectionStyle}>
            <Text style={thumbTextStyle}>What next steps would you like to see?</Text>
            <TextInput
              style={smallTextInputStyle}
              multiline={true}
              numberOfLines={4}
              editable={true}
              maxLength={140}
              onChangeText={(text) => this.setState({ nextSteps: text })}
              value={this.state.nextSteps}
            />
          </View>
        </ScrollView>
        <BlueButton onPress={() => this.handleSubmit()}>
          Submit Feedback
        </BlueButton>
        <ShakeMessage
          visible={this.state.showModal}
          onAccept={this.onOk.bind(this)}
        >
          Please make sure to provide an answer to all questions in the feedback form. Thanks again for your time!!
        </ShakeMessage>
      </View>
    )
  }
}

const styles = {
  pageStyle: {
    flex: 1,
    backgroundColor: '#FF004F',
  },
  titleStyle: {
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 25
  },
  sectionStyle:{
    flexDirection: 'column',
    width: '90%',
    marginTop: 40,
    marginLeft: '5%',
    alignItems: 'center'
  },
  thumbTextStyle: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  yesThumbImageStyle: {
    height: 70,
    width: 70,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  noThumbImageStyle: {
    height: 70,
    width: 70,
    marginLeft: 20,
    transform: [{rotateX: '180deg'}, {rotateY: '180deg'}],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  textInputStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 2,
    marginTop: 10,
    padding: 5
  },
  smallTextInputStyle: {
    width: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 2,
    marginTop: 10,
    padding: 5
  }
}

const mapStateToProps = state => {
  return { testPilot: state.testPilot}
}

export default connect(mapStateToProps, { painGainInputUpdate, simpleInputUpdate })(Feedback)
