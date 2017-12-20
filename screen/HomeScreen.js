import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Button, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import axios from 'axios'

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Randomize Gif',
    headerStyle: { marginTop: 24 },
  }

  constructor(props) {
    super()

    this.state = {
      headers: "An application for change your mood",
      mood: {
        image_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif',
        fixed_width_small_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif'
      }
    }

    this.getMoodFromGiphy()
    this.getMoodFromGiphy = this.getMoodFromGiphy.bind(this)
  }

  getMoodFromGiphy(){
    this.setState({
      mood: {
        image_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif',
        fixed_width_small_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif'
     }
    }, () => {
      axios.get('https://api.giphy.com/v1/gifs/random?api_key=sKMWhStnyc6mWswAtjtKfKxS4x5sisKL&tag=&rating=G')
      .then(({ data }) => {
        this.setState({
          mood: data.data
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          mood: {
            image_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif',
            fixed_width_small_url: 'https://media.giphy.com/media/KDBkZDXoHQl9K/giphy.gif'
         }
        })
      })
    })

  }

  componentDidMount(){
    this.getMoodFromGiphy()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View>
          <Image
              style={{width: 300, height: 300}}
              source={{uri: this.state.mood.fixed_width_small_url}}
          />
        </View>
        <Text>{this.state.mood.fixed_width_small_url}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title='re-roll' onPress={this.getMoodFromGiphy} />
          <Button
            title='Trending gif' onPress={ () => navigate('Trending')} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getTrending: () => dispatch(gifAction)
  })
}

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
export default HomeScreen
