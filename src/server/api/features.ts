import express, { Request, Response } from "express";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { FeatureFlag, FeatureFlagArray } from "@/schema/feature";
import { RequireAdmin } from "@/server/middleware/require-admin";

const featureRouter = express.Router();

/**
 * Get all feature flags.
 */
featureRouter.get("/features", RequireAdmin, async (
    _request: Request,
    response: Response<z.infer<typeof FeatureFlagArray>>,
) => {
    const result = await prisma.feature.findMany();
    return response.status(200).send(result);
});

/**
 * Get status of specific feature flag.
 */
featureRouter.get("/features/:id", async (
    request,
    response,
) => {
    const result = await prisma.feature.findFirst({
        where: {
            id: request.params.id,
        },
    });

    return response
        .status(result && result.enable ? 200 : 418)
        .setHeader("Cache-Control", "public, max-age=1800, s-maxage=3600")
        .send({ feature: request.params.id });
});

/**
 * Delete a feature flag.
 */
featureRouter.delete("/features/:id", RequireAdmin, async (
    request,
    response,
) => {
    try {
        await prisma.feature.deleteMany({
            where: {
                id: request.params.id,
            },
        });

        return response.status(200).send({
            message: "Deleted.",
        });
    }
    catch {
        return response.status(500).send({
            error: "Unable to delete.",
        });
    }
});

/**
 * Edit a feature flag.
 */
featureRouter.patch("/features/:id", RequireAdmin, async (
    request: Request<{ id: string }, object, z.infer<typeof FeatureFlag>>,
    response: Response,
) => {
    const body = request.body;

    const changes = await prisma.feature.updateMany({
        data: {
            description: body.description,
            enable: body.enable,
            group: body.group,
            id: body.id,
        },
        where: {
            id: request.params.id,
        },
    });

    if (changes.count === 0) {
        return response.status(400).send({
            error: "No such record.",
        });
    }

    return response.status(200).send({
        message: "Edited.",
    });
});

/**
 * Create new feature flag.
 */
featureRouter.put("/features/:id", RequireAdmin, async (
    request: Request<{ id: string }, object, z.infer<typeof FeatureFlag>>,
    response: Response,
) => {
    try {
        const body = request.body;

        await prisma.feature.create({
            data: {
                description: body.description,
                enable: body.enable,
                group: body.group,
                id: request.params.id,
            },
        });

        return response.status(201).send({ message: "Created." });
    }
    catch {
        return response.status(500).send({ error: "Unable to create features." });
    }
});

export { featureRouter };
