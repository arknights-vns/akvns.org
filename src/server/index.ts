import "dotenv/config";
import cors from "cors";
import express from "express";
import next from "next";
import { parse } from "node:url";

import { authRouter } from "@/server/api/auth";
import { comicArchiveRouter } from "@/server/api/comic-archive";
import { comicAssetRouter } from "@/server/api/comic-asset";
import { comicCollectionRouter } from "@/server/api/comic-collection";
import { featureRouter } from "@/server/api/features";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const development = process.env.NODE_ENV !== "production";
const app = next({
    customServer: true,
    dev: development,
});
const handle = app.getRequestHandler();

// eslint-disable-next-line unicorn/prefer-top-level-await
app.prepare().then(() => {
    const server = express();

    server.use(
        cors({
            credentials: true,
            methods: "*",
            origin: [
                `http://localhost:${port}`,
                process.env.PRODUCTION_URL || `http://localhost:${port}`,
            ],
        }),
    );

    server.use(authRouter);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use("/api", featureRouter);
    server.use("/api", comicArchiveRouter);
    server.use("/api", comicAssetRouter);
    server.use("/api", comicCollectionRouter);

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
