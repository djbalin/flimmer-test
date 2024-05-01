import ListItem from "@/components/ListItem";
import NewNoteForm from "@/components/NewNoteForm";
import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { Alert, FlatList, Modal, Pressable } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  const notes = useQuery(api.notes.getAll);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={notes}
        keyExtractor={(note) => note._id}
        renderItem={(note) => (
          <ListItem title={note.item.title} content={note.item.content} />
        )}
      />
      <View style={styles.addNoteContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <NewNoteForm setModalVisible={setModalVisible} />
        </Modal>
        <Pressable
          onPress={(e) => setModalVisible((prev) => !prev)}
          style={styles.button}
        >
          <Text>Tilføj note</Text>
        </Pressable>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  button: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  addNoteContainer: {
    alignSelf: "flex-end",
  },
  listContainer: {
    // gap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
}));
