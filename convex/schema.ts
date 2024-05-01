import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Leveraging the auto-generated _id field of Convex
export default defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.string(),
    // _id: v.string(),
  }),
});
