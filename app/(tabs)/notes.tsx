import ListItem from "@/components/ListItem";
import NoteForm from "@/components/NoteForm";
import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  const notes = useQuery(api.notes.getAll);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {notes && notes?.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={notes}
          keyExtractor={(note) => note._id}
          renderItem={(note) => (
            <ListItem
              title={note.item.title}
              content={note.item.content}
              _id={note.item._id}
            />
          )}
        />
      ) : (
        <Text>Tilføj en note!</Text>
      )}
      <View style={styles.addNoteContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <NoteForm data={null} setModalVisible={setModalVisible} />
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
    justifyContent: "space-between",
    flexDirection: "column",
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
