import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuid from "react-native-uuid";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const [loadedToDos, setLoadedToDos] = useState(false);
  const [toDos, setToDos] = useState({});

  const _controlNewToDo = (text) => {
    setNewToDo(text);
  };
  const _loadToDos = () => {
    //loading...
    setLoadedToDos(true);
  };
  const _addToDo = () => {
    if (newToDo !== "") {
      setToDos((prevToDos) => {
        const ID = uuid.v1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now(),
          },
        };
        //TextInput clear
        setNewToDo("");

        return { ...prevToDos, ...newToDoObject };
      });
    }
  };

  const _deleteToDo = (id) => {
    setToDos((prevToDos) => {
      delete toDos[id];
      return { ...prevToDos, ...toDos };
    });
  };

  const _uncompleteToDo = (id) => {
    setToDos((prevToDos) => {
      return {
        ...prevToDos,
        [id]: {
          ...prevToDos[id],
          isCompleted: false,
        },
      };
    });
  };

  const _completeToDo = (id) => {
    setToDos((prevToDos) => {
      return {
        ...prevToDos,
        [id]: {
          ...prevToDos[id],
          isCompleted: true,
        },
      };
    });
  };

  useEffect(() => {
    _loadToDos();
  }, []);

  useEffect(() => {
    console.log(toDos);
  }, [toDos]);

  if (!loadedToDos) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kawai To Do</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={"New To Do"}
          value={newToDo}
          onChangeText={_controlNewToDo}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={_addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(toDos).map((toDo) => (
            <ToDo
              key={toDo.id}
              deleteToDo={_deleteToDo}
              completeToDo={_completeToDo}
              uncompleteToDo={_uncompleteToDo}
              {...toDo}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#abcdeF",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    margin: 50,
    fontWeight: "700",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  toDos: {
    alignItems: "center",
  },
});
