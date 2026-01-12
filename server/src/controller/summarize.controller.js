import { z } from "zod";
import { scrapeWebsiteText } from "../services/scrape.service.js";
import { summarizeText } from "../services/summarize.service.js";

const bodySchema = z.object({
    url: z.string().min(5),
    method: z.enum(["cheerio", "puppeteer"]).optional().default("puppeteer"),
    maxChars: z.number().int().positive().max(20000).optional().default(8000),
});

export const summarizeUrlController = async (req, res, next) => {
    try {
        const parsed = bodySchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                errors: z.treeifyError(err),
            });
        }

        const { url, method, maxChars } = parsed.data;

        const extractedText = await scrapeWebsiteText(url, method, maxChars);

        const summary = await summarizeText(extractedText);

        return res.status(200).json({
            success: true,
            url,
            extractedChars: extractedText.length,
            summary,
        });
    } catch (err) {
        next(err);
    }
};