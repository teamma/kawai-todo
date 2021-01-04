import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

ToDo.prototypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  completeToDo: PropTypes.func.isRequired,
  uncompleteToDo: PropTypes.func.isRequired,
};

function ToDo({ text, id, deleteToDo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsComplete] = useState(false);
  const [toDoValue, setToDoValue] = useState(text);

  const _toggleComplete = () => {
    setIsComplete(!isCompleted);
  };

  const _startEditing = () => {
    setIsEditing(true);
    // setToDoValue(text);
  };

  const _finishEditing = () => {
    setIsEditing(false);
  };

  const _controlInput = (text) => {
    setToDoValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity onPress={_toggleComplete}>
          <View
            style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompleteCircle]}
          ></View>
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              styles.input,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}
            value={toDoValue}
            multiline={true}
            onChangeText={_controlInput}
            returnKeyType={"done"}
            onBlur={_finishEditing}
          />
        ) : (
          <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
            {text}
          </Text>
        )}
      </View>

      {isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={_finishEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✅</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={_startEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✏️</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => deleteToDo(id)}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  completeCircle: {
    borderColor: "#bbb",
  },
  uncompleteCircle: {
    borderColor: "#F23657",
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  uncompletedText: {
    color: "#353839",
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  actionText: {},
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5,
  },
});

export default ToDo;
