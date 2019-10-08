import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      history: "",
      message: "",
      user: "",
      output: ""
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
  }

  componentDidMount = () =>
    AsyncStorage.getItem("user").then(user => this.setState({ user: user }));

  setUser = user => {
    AsyncStorage.setItem("user", user);
    this.setState({ user: user });
  };

  handleChangeText(new_message) {
    this.setState({
      message: new_message
    });
  }

  handleHistory() {
    let st = this.state;
    st.history = this.state.history + "\n" + this.state.message;
    st.output = this.state.user + ": " + this.state.history;
    this.setState(st);

    console.log(this.state.user);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.first_half}>
          <Text style={styles.headerTitle}>Application Chat</Text>
          <TextInput
            style={styles.name_input}
            underlineColorAndroid="transparent"
            placeholder="Name"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={this.componentDidMount}
          />
          <ScrollView
            style={styles.message_output}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Message"
            placeholderTextColor="grey"
            autoCapitalize="none"
          >
            <Text>{this.state.output}</Text>
          </ScrollView>
        </View>
        <View style={styles.second_half}>
          <TextInput
            style={styles.message_input}
            underlineColorAndroid="transparent"
            placeholder="Message"
            placeholderTextColor="grey"
            autoCapitalize="none"
            defaultValue={this.state.history}
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity
            style={styles.button_wrap}
            onPress={this.handleHistory}
          >
            <Text style={styles.button}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  first_half: {
    flex: 4,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  second_half: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    flex: 1,
    marginTop: 50,
    fontSize: 40,
    fontWeight: "bold",
    color: "#5ba4bd"
  },
  name_input: {
    paddingLeft: 3,
    marginBottom: 15,
    height: 40,
    backgroundColor: "#acd9e8",
    width: "90%",
    borderColor: "#5ba4bd",
    borderWidth: 1,
    borderRadius: 5
  },
  message_output: {
    flex: 2,
    backgroundColor: "#acd9e8",
    paddingLeft: 3,
    width: "90%",
    margin: 15,
    borderColor: "#5ba4bd",
    borderWidth: 1,
    borderRadius: 5
  },
  message_input: {
    flex: 1,
    backgroundColor: "#acd9e8",
    borderColor: "#5ba4bd",
    borderWidth: 1,
    margin: 20,
    marginTop: 15,
    alignSelf: "stretch",
    borderRadius: 5
  },
  button_wrap: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 15,
    margin: 20,
    marginLeft: 0,
    backgroundColor: "#5ba4bd",
    justifyContent: "center",
    borderRadius: 5
  },
  button: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 30,
    textAlign: "center"
  }
});

export default Chat;
