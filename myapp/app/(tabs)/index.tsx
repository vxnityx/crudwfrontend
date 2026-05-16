import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import axios from 'axios';


interface Author {
  id: number;
  first_name: string;
  last_name: string;
}


export default function App() {

  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = async () => {
    try {

      const response = await axios.get(
        'http://192.168.0.85:8000/api/v1/authors/'
      );

      setAuthors(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Authors
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});