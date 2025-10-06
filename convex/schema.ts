import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Database schema for the task management application
 * Defines the structure of tasks and users tables
 */
export default defineSchema({
  // Tasks table - stores all task information
  tasks: defineTable({
    title: v.string(), // Task title/description
    description: v.optional(v.string()), // Optional detailed description
    completed: v.boolean(), // Task completion status
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")), // Task priority level
    dueDate: v.optional(v.string()), // Optional due date (ISO string)
    createdAt: v.number(), // Creation timestamp
    updatedAt: v.number(), // Last update timestamp
    userId: v.string(), // User who created the task
  })
    .index("by_user", ["userId"]) // Index for efficient user-based queries
    .index("by_user_completed", ["userId", "completed"]) // Index for filtering by user and completion status
    .index("by_user_priority", ["userId", "priority"]), // Index for filtering by user and priority

  // Users table - stores user information
  users: defineTable({
    name: v.string(), // User's display name
    email: v.string(), // User's email address
    image: v.optional(v.string()), // Optional profile image URL
  })
    .index("by_email", ["email"]), // Index for efficient email-based lookups
});


