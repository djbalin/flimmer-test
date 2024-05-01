import { Text, View } from "@/components/Themed";
import { Pressable } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function ListItem({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.listItem}>
      <View style={styles.noteContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemContent}>{content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text>Redigér</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text>Slet</Text>
        </Pressable>
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.typography,
  },
  itemContent: {
    fontSize: 14,
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
