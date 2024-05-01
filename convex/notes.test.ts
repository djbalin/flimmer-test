import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

test("adding note works", async () => {
  const t = convexTest(schema);
  const noteId = await t.mutation(api.notes.addNote, {
    title: "hey",
    content: "hey",
  });
  const notes = await t.query(api.notes.getAll);
  expect(notes).toHaveLength(1);
});

test("fetching all notes works", async () => {
  const t = convexTest(schema);

  const notesToAdd = 5;

  for (let i = 0; i < notesToAdd; i++) {
    await t.mutation(api.notes.addNote, {
      title: "title " + i,
      content: "content " + i,
    });
  }
  const notes = await t.query(api.notes.getAll);
  expect(notes).toHaveLength(notesToAdd);
  expect(notes[0].title).toBe("title 0");
  expect(notes[3].content).toBe("content 3");
});

test("fetching one note works", async () => {
  const t = convexTest(schema);

  const noteId = await t.mutation(api.notes.addNote, {
    title: "hey",
    content: "hey",
  });

  const note = await t.query(api.notes.getNote, { id: noteId });
  expect(note).toBeDefined();
  expect(note!.title).toBe("hey");
});

test("delete note works", async () => {
  const t = convexTest(schema);

  const note1 = await t.mutation(api.notes.addNote, {
    title: "hey title",
    content: "hey content",
  });

  const note2 = await t.mutation(api.notes.addNote, {
    title: "hey title",
    content: "hey content",
  });

  const notesBefore = await t.query(api.notes.getAll);
  expect(notesBefore).toHaveLength(2);

  await t.mutation(api.notes.deleteNote, { id: note1 });
  const notesAfter = await t.query(api.notes.getAll);
  expect(notesAfter).toHaveLength(1);
  expect(notesAfter[0]._id).toBe(note2);
});
