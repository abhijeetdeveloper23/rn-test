import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";

const ListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)} style={styles.cardContainer}>
    <View style={styles.content}>
      <Text style={styles.id}>ID: {item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  </TouchableOpacity>
);

const Loading = ()=> {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

const Error = (error)=>{
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
const styles = StyleSheet.create({
    cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  content: {
    padding: 16,
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Changed color to improve readability
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#666", // Changed color to improve readability
  },
});

export { ListItem, Loading, Error };
