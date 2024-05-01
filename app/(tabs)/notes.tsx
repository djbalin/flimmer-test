import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ListItemProps = { title: string; content: string };

function ListItem({ title, content }: { title: string; content: string }) {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemContent}>{content}</Text>
    </View>
  );
}

export default function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  const notes = useQuery(api.notes.getAll);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(note) => note._id}
        renderItem={(note) => (
          <ListItem title={note.item.title} content={note.item.content} />
        )}
      />
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
  listItem: {
    width: "100%",
    color: theme.colors.typography,
    padding: 20,
    marginBottom: 10,
    minWidth: "100%",
    borderRadius: 10,
    borderWidth: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.typography,
  },
  itemContent: {
    fontSize: 14,
    color: theme.colors.typography,
  },
}));
