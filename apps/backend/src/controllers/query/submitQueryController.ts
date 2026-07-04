import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function submitQueryController(req: Request, res: Response) {
    const { name, email, phone, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        res.status(400).json({ success: false, message: "Name, email, and message are required." });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        res.status(400).json({ success: false, message: "Invalid email address." });
        return;
    }

    try {
        const query = await prisma.userQuery.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone?.trim() || null,
                message: message.trim(),
            },
        });
        res.status(201).json({ success: true, query });
    } catch (error) {
        console.error("Error saving user query:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}
