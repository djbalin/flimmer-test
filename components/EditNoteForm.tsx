import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text, View } from "./Themed";

export default function EditNoteForm({
  setModalVisible,
  noteData,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  noteData: { title: string; content: string; _id: string };
}) {
  const { styles } = useStyles(stylesheet);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: noteData.title,
      content: noteData.content,
    },
  });

  const updateNote = useMutation(api.notes.replaceNote);

  function onSubmit(data: { title: string; content: string }) {
    console.log("ONSUBMIT EDIT CALLED");

    async function updateNoteData() {
      const newNoteData = {
        title: data.title,
        content: data.content,
        id: noteData._id as Id<"notes">,
      };
      await updateNote(newNoteData);
    }
    updateNoteData();

    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Redigér note</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Titel"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text>Giv noten et navn</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Indhold"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="content"
        />
        {errors.content && <Text>Skriv notens indhold</Text>}
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button]} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Gem ændringer</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
            onPress={(e) => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Luk</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  button: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
  },
  buttonText: {
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  modalView: {
    // margin: 20,
    gap: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
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
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 30,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    minWidth: 200,
    width: "100%",
  },
}));
