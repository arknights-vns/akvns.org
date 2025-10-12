import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    outputDir: "playwright-report/",
    projects: [
        {
            name: "Desktop Chrome",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
        {
            name: "Desktop Firefox",
            use: {
                ...devices["Desktop Firefox"],
            },
        },
        {
            name: "Mobile Chrome",
            use: {
                ...devices["Galaxy S24"],
            },
        },
    ],
    retries: 1,
    testDir: path.join(__dirname, "tests"),
    timeout: 30 * 1000,
    use: {
        baseURL,
        trace: "retry-with-trace",
    },
    webServer: {
        command: "npm run dev",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        url: baseURL,
    },
});
