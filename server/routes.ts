import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertWishSchema, insertWishLikeSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Configure multer for file uploads
  const storage_multer = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueId = crypto.randomUUID();
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueId}${ext}`);
    }
  });

  const upload = multer({
    storage: storage_multer,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });

  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadsDir));

  // Profile routes
  app.get("/api/profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await storage.getProfile(id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profiles", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      console.error("Error creating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertProfileSchema.partial().parse(req.body);
      const profile = await storage.updateProfile(id, updates);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Wish routes
  app.get("/api/wishes", async (req, res) => {
    try {
      const wishes = await storage.getAllWishes();
      res.json(wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/wishes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const wish = await storage.getWish(id);
      if (!wish) {
        return res.status(404).json({ error: "Wish not found" });
      }
      res.json(wish);
    } catch (error) {
      console.error("Error fetching wish:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/wishes/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const wishes = await storage.getWishesByUser(userId);
      res.json(wishes);
    } catch (error) {
      console.error("Error fetching user wishes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/wishes", async (req, res) => {
    try {
      const validatedData = insertWishSchema.parse(req.body);
      const wish = await storage.createWish(validatedData);
      res.status(201).json(wish);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid wish data", details: error.errors });
      }
      console.error("Error creating wish:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/wishes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertWishSchema.partial().parse(req.body);
      const wish = await storage.updateWish(id, updates);
      if (!wish) {
        return res.status(404).json({ error: "Wish not found" });
      }
      res.json(wish);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid wish data", details: error.errors });
      }
      console.error("Error updating wish:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/wishes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteWish(id);
      if (!deleted) {
        return res.status(404).json({ error: "Wish not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting wish:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Wish likes routes
  app.get("/api/wishes/:id/likes", async (req, res) => {
    try {
      const { id } = req.params;
      const likes = await storage.getWishLikes(id);
      res.json({ likes });
    } catch (error) {
      console.error("Error fetching wish likes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/wishes/:wishId/likes/:userId", async (req, res) => {
    try {
      const { wishId, userId } = req.params;
      const isLiked = await storage.isWishLikedByUser(wishId, userId);
      res.json({ isLiked });
    } catch (error) {
      console.error("Error checking wish like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/wishes/:wishId/likes", async (req, res) => {
    try {
      const { wishId } = req.params;
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const isLiked = await storage.toggleWishLike(wishId, userId);
      const totalLikes = await storage.getWishLikes(wishId);
      
      res.json({ isLiked, totalLikes });
    } catch (error) {
      console.error("Error toggling wish like:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Image upload route
  app.post("/api/upload", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Return the URL where the file can be accessed
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
