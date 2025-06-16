import { pgTable, text, serial, integer, boolean, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),
  theme_preference: text("theme_preference").default("light"),
  language_preference: text("language_preference").default("en"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const wishes = pgTable("wishes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image_url: text("image_url"),
  link: text("link"),
  tags: text("tags").array(),
  likes: integer("likes").default(0),
  status: text("status"), // "completed" | "not_completed" | null
  user_id: uuid("user_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const wish_likes = pgTable("wish_likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  wish_id: uuid("wish_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Legacy users table for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertWishSchema = createInsertSchema(wishes).omit({
  id: true,
  created_at: true,
  updated_at: true,
  likes: true,
});

export const insertWishLikeSchema = createInsertSchema(wish_likes).omit({
  id: true,
  created_at: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertWish = z.infer<typeof insertWishSchema>;
export type Wish = typeof wishes.$inferSelect;
export type InsertWishLike = z.infer<typeof insertWishLikeSchema>;
export type WishLike = typeof wish_likes.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
