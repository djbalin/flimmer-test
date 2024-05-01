import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// No error handling done for now!
// No error handling done for now!

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query("notes").collect();

    return notes;
  },
});

export const getNote = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    return note;
  },
});

export const addNote = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
    });
    return noteId;
  },
});

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const replaceNote = mutation({
  args: { id: v.id("notes"), title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.replace(args.id, { title: args.title, content: args.content });
  },
});
