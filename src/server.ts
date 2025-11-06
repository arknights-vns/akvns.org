import express from "express";
import next from "next";
import { parse } from "node:url";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const development = process.env.NODE_ENV !== "production";
const app = next({ dev: development });
const handle = app.getRequestHandler();

// eslint-disable-next-line unicorn/prefer-top-level-await
app.prepare().then(() => {
    const server = express();

    // I blame Express v5
    server.all("/{*splat}", (request, response) => {
        const parsedUrl = parse(request.url, true);
        handle(request, response, parsedUrl).then();
    });

    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.info(`Server listening at port ${port} as ${process.env.NODE_ENV}`);
    });
});
