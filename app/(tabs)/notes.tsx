import { Text, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { createStyleSheet, useStyles } from "react-native-unistyles";

export default async function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  const notes = useQuery(api.notes.getAll);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Noteer</Text>
      <Text style={styles.text}>{notes?.map((note) => note.title)}</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.typography,
  },
}));
