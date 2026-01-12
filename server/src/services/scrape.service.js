import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import { validateUrl } from "../utils/validateUrl.js";
import { cleanText } from "../utils/cleanText.js";

export const scrapeWebsiteText = async (url, method = "puppeteer", maxChars = 8000) => {
    if (!validateUrl(url)) {
        const error = new Error("Invalid URL. Please provide a valid website link.");
        error.statusCode = 400;
        throw error;
    }

    let docs = [];

    if (method === "cheerio") {
        const loader = new CheerioWebBaseLoader(url, {
            selector: "body",
        });

        docs = await loader.load();
    }

    if (method === "puppeteer") {
        const loader = new PuppeteerWebBaseLoader(url, {
            launchOptions: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] },
            gotoOptions: { waitUntil: "networkidle2", timeout: 60000 },
            evaluate: async (page) => {
                return await page.evaluate(() => {
                    const main =
                        document.querySelector("article") ||
                        document.querySelector("main") ||
                        document.body;

                    main.querySelectorAll("script, style, noscript, iframe, svg, img, video").forEach((el) => el.remove());

                    return main.innerText;
                });
            },
        });

        docs = await loader.load();
    }

    if (!docs?.length) {
        const error = new Error("Unable to extract content from the given website.");
        error.statusCode = 422;
        throw error;
    }

    const rawText = docs.map((d) => d.pageContent).join("\n");

    const cleaned = cleanText(rawText);

    return cleaned.slice(0, maxChars);
};
