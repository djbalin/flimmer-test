import ListItem from "@/components/ListItem";
import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FlatList, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  const notes = useQuery(api.notes.getAll);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={notes}
        keyExtractor={(note) => note._id}
        renderItem={(note) => (
          <ListItem title={note.item.title} content={note.item.content} />
        )}
      />
      <View style={styles.addNoteContainer}>
        <Pressable style={styles.button}>
          <Text>Tilføj note</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
}));
