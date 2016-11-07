import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import Footer from './footer';

class LeaderBoardList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      leaderboardList: []
    }
    // Get all of the lesson detail objects on component load
    this.getLeaderBoard();
  }

  // Get all of the lesson titles & ids
  getLeaderBoard() {
    const url = 'http://localhost:3011/api/users'
    fetch(url)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data)
      this.setState({'leaderboardList': data})
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { viewStyle, profileText, profileTitle, listStyle } = styles;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: .9}}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={viewStyle}>
            {
              this.state.leaderboardList.map((user, index) => {
                return (
                  <View style={listStyle} key={index}>
                      <Text style={profileTitle}>{user.username}</Text>
                      <Text style={profileText}>{user.totalScore}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={{flex: .1}}>
          <Footer
            user={this.props.user}
            lesson={true}
            profile={true}
            leaderBoard={true}
            navigator={this.props.navigator}
          />
        </View>
      </View>
    )
  }
};

const styles = {
  viewStyle: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  listStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileText: {
    color: '#1c1c1c',
    fontSize: 16,
    padding: 5
  },
  profileTitle: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  
}

export default LeaderBoardList;
