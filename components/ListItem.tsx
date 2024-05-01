import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Modal, Pressable } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";
import NoteForm from "./NoteForm";

export default function ListItem({
  title,
  content,
  _id,
}: {
  title: string;
  content: string;
  _id: string;
}) {
  const { styles } = useStyles(stylesheet);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteSingleNote = useMutation(api.notes.deleteNote);
  function deleteNote() {
    async function deleteNoteData() {
      const id = _id as Id<"notes">;
      await deleteSingleNote({ id });
    }
    deleteNoteData();
  }
  return (
    <View style={styles.listItem}>
      <View style={styles.noteContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemContent}>{content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={(e) => setModalVisible((prev) => !prev)}
          style={styles.button}
        >
          <Text>Redigér</Text>
        </Pressable>
        <Pressable onPress={deleteNote} style={styles.button}>
          <Text>Slet</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <NoteForm
          data={{ title: title, content: content, _id: _id }}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  listItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 10,
    // minWidth: "100%",
    borderRadius: 10,
    borderWidth: 1,
  },
  noteContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },

  itemTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    color: theme.colors.typography,
  },
  itemContent: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.typography,
  },
  button: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
}));
