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
