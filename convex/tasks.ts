import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Query to get all tasks for a specific user
 * @param userId - The ID of the user whose tasks to retrieve
 * @returns Array of tasks belonging to the user
 */
export const getTasks = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

/**
 * Query to get tasks filtered by completion status
 * @param userId - The ID of the user whose tasks to retrieve
 * @param completed - Whether to show completed or incomplete tasks
 * @returns Array of filtered tasks
 */
export const getTasksByStatus = query({
  args: { 
    userId: v.string(),
    completed: v.boolean()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_user_completed", (q) => 
        q.eq("userId", args.userId).eq("completed", args.completed)
      )
      .order("desc")
      .collect();
  },
});

/**
 * Query to get tasks filtered by priority
 * @param userId - The ID of the user whose tasks to retrieve
 * @param priority - The priority level to filter by
 * @returns Array of tasks with the specified priority
 */
export const getTasksByPriority = query({
  args: { 
    userId: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_user_priority", (q) => 
        q.eq("userId", args.userId).eq("priority", args.priority)
      )
      .order("desc")
      .collect();
  },
});

/**
 * Mutation to create a new task
 * @param title - The task title
 * @param description - Optional task description
 * @param priority - Task priority level
 * @param dueDate - Optional due date
 * @param userId - ID of the user creating the task
 * @returns The ID of the created task
 */
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Validate input data
    if (!args.title.trim()) {
      throw new Error("Task title cannot be empty");
    }
    
    if (args.title.length > 200) {
      throw new Error("Task title cannot exceed 200 characters");
    }
    
    if (args.description && args.description.length > 1000) {
      throw new Error("Task description cannot exceed 1000 characters");
    }

    return await ctx.db.insert("tasks", {
      title: args.title.trim(),
      description: args.description?.trim(),
      completed: false,
      priority: args.priority,
      dueDate: args.dueDate,
      createdAt: now,
      updatedAt: now,
      userId: args.userId,
    });
  },
});

/**
 * Mutation to update an existing task
 * @param id - The ID of the task to update
 * @param updates - Object containing fields to update
 * @returns Promise that resolves when the task is updated
 */
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Validate input data
    if (updates.title !== undefined) {
      if (!updates.title.trim()) {
        throw new Error("Task title cannot be empty");
      }
      if (updates.title.length > 200) {
        throw new Error("Task title cannot exceed 200 characters");
      }
      updates.title = updates.title.trim();
    }
    
    if (updates.description !== undefined && updates.description.length > 1000) {
      throw new Error("Task description cannot exceed 1000 characters");
    }
    
    if (updates.description !== undefined) {
      updates.description = updates.description?.trim();
    }

    // Add updated timestamp
    updates.updatedAt = Date.now();

    await ctx.db.patch(id, updates);
  },
});

/**
 * Mutation to delete a task
 * @param id - The ID of the task to delete
 * @returns Promise that resolves when the task is deleted
 */
export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * Mutation to toggle task completion status
 * @param id - The ID of the task to toggle
 * @returns Promise that resolves when the task is updated
 */
export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    
    await ctx.db.patch(args.id, {
      completed: !task.completed,
      updatedAt: Date.now(),
    });
  },
});


