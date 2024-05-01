import { Text, View } from "@/components/Themed";

import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function TabOneScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Noter</Text>
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
