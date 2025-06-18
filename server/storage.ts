import { db } from "./db";
import { profiles, wishes, wish_likes, users, type Profile, type Wish, type WishLike, type User, type InsertProfile, type InsertWish, type InsertWishLike, type InsertUser } from "@shared/schema";
import { eq, desc, sql, and } from "drizzle-orm";

export interface IStorage {
  // Profile methods
  getProfile(id: string): Promise<Profile | undefined>;
  getProfileByEmail(email: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, updates: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Wish methods
  getAllWishes(): Promise<(Wish & { profiles: { full_name: string | null; avatar_url: string | null } })[]>;
  getWish(id: string): Promise<Wish | undefined>;
  getWishesByUser(userId: string): Promise<Wish[]>;
  createWish(wish: InsertWish): Promise<Wish>;
  updateWish(id: string, updates: Partial<InsertWish>): Promise<Wish | undefined>;
  deleteWish(id: string): Promise<boolean>;
  
  // Wish likes methods
  getWishLikes(wishId: string): Promise<number>;
  isWishLikedByUser(wishId: string, userId: string): Promise<boolean>;
  toggleWishLike(wishId: string, userId: string): Promise<boolean>;
  
  // Legacy user methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Profile methods
  async getProfile(id: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.id, id)).limit(1);
    return result[0];
  }

  async getProfileByEmail(email: string): Promise<Profile | undefined> {
    const result = await db.select().from(profiles).where(eq(profiles.email, email)).limit(1);
    return result[0];
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const result = await db.insert(profiles).values({
      id: crypto.randomUUID(),
      ...profile
    }).returning();
    return result[0];
  }

  async updateProfile(id: string, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    const result = await db.update(profiles)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(profiles.id, id))
      .returning();
    return result[0];
  }

  // Wish methods
  async getAllWishes(): Promise<(Wish & { profiles: { full_name: string | null; avatar_url: string | null } })[]> {
    const result = await db
      .select({
        id: wishes.id,
        title: wishes.title,
        description: wishes.description,
        image_url: wishes.image_url,
        link: wishes.link,
        tags: wishes.tags,
        likes: wishes.likes,
        status: wishes.status,
        user_id: wishes.user_id,
        created_at: wishes.created_at,
        updated_at: wishes.updated_at,
        profiles: {
          full_name: profiles.full_name,
          avatar_url: profiles.avatar_url,
        },
      })
      .from(wishes)
      .leftJoin(profiles, eq(wishes.user_id, profiles.id))
      .orderBy(desc(wishes.created_at));
    
    return result.map(row => ({
      ...row,
      profiles: row.profiles || { full_name: null, avatar_url: null }
    }));
  }

  async getWish(id: string): Promise<Wish | undefined> {
    const result = await db.select().from(wishes).where(eq(wishes.id, id)).limit(1);
    return result[0];
  }

  async getWishesByUser(userId: string): Promise<Wish[]> {
    return await db.select().from(wishes).where(eq(wishes.user_id, userId)).orderBy(desc(wishes.created_at));
  }

  async createWish(wish: InsertWish): Promise<Wish> {
    const result = await db.insert(wishes).values(wish).returning();
    return result[0];
  }

  async updateWish(id: string, updates: Partial<InsertWish>): Promise<Wish | undefined> {
    const result = await db.update(wishes)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(wishes.id, id))
      .returning();
    return result[0];
  }

  async deleteWish(id: string): Promise<boolean> {
    const result = await db.delete(wishes).where(eq(wishes.id, id)).returning();
    return result.length > 0;
  }

  // Wish likes methods
  async getWishLikes(wishId: string): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(wish_likes)
      .where(eq(wish_likes.wish_id, wishId));
    return result[0]?.count || 0;
  }

  async isWishLikedByUser(wishId: string, userId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(wish_likes)
      .where(and(eq(wish_likes.wish_id, wishId), eq(wish_likes.user_id, userId)))
      .limit(1);
    return result.length > 0;
  }

  async toggleWishLike(wishId: string, userId: string): Promise<boolean> {
    const existing = await db
      .select()
      .from(wish_likes)
      .where(and(eq(wish_likes.wish_id, wishId), eq(wish_likes.user_id, userId)))
      .limit(1);

    if (existing.length > 0) {
      // Unlike
      await db
        .delete(wish_likes)
        .where(and(eq(wish_likes.wish_id, wishId), eq(wish_likes.user_id, userId)));
      
      // Decrement likes count
      await db
        .update(wishes)
        .set({ likes: sql`${wishes.likes} - 1` })
        .where(eq(wishes.id, wishId));
      
      return false;
    } else {
      // Like
      await db.insert(wish_likes).values({ wish_id: wishId, user_id: userId });
      
      // Increment likes count
      await db
        .update(wishes)
        .set({ likes: sql`${wishes.likes} + 1` })
        .where(eq(wishes.id, wishId));
      
      return true;
    }
  }

  // Legacy user methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
