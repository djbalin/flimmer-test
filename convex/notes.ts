import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query("notes").collect();
    return notes;
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
