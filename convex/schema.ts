import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// I am not defining id or _id as a schema field here, because Convex automatically adds and maintains it.
export default defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.string(),
  }),
});
