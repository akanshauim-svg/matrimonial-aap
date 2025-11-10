import fs from "fs";
import path from "path";
import { Express } from "express";

/**
 * Save uploaded file and return full URL
 * @param file - Multer file object
 * @param userId - user ID or temporary ID
 * @param baseUrl - backend base URL (optional, fallback to env)
 * @returns full file URL
 */
export const saveUploadedFile = (
  file: Express.Multer.File,
  userId: number | string,
  baseUrl?: string
): string => {
  if (!file) return "";

  const uploadsDir = path.join(process.cwd(), "uploads", String(userId));
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, file.originalname);
  fs.writeFileSync(filePath, file.buffer);

  const urlBase =
    baseUrl || process.env.BASE_URL || "http://localhost:3002";

  return `${urlBase}/uploads/${userId}/${file.originalname}`;
};
