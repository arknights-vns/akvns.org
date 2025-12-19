# Welcome to Arknights VNS

> Yes, it is in English despite the fact that the entire team (at time of writing this) are all Vietnamese.

## What is this project?

Well, this is the public source code for the website [akvns.org](https://akvns.org).

## What is inside?

- The website: duh!
- And many more features will be added gradually.

and... everything is AGPLv3-licensed, so some of you guys will be pissed a lot, but it is what it is, welcome to OSS.

> [!Note]
> Please note that **not everything** will be pushed in here, as in:
>
> - Some of our Arknights-VNS-events-specific patches.
> - A boatload of internal patches.
> - Server config files.

## What is the techstack?

Probably taking some time looking at the source code would give you the answer, but here is the short list:

| Name      | Usage                                                                            |
|-----------|----------------------------------------------------------------------------------|
| Next.js   | Full-stack development, obviously.                                               |
| PostHog   | Telemetry & flag management.                                                     |
| shadcn/ui | User Interface                                                                   |
| Drizzle   | ORM Layer                                                                        |
| Postgres  | Database, [with our own version](https://github.com/arknights-vns/postgresql-17).|
| Biome     | Code linter                                                                      |

> [!Note]
> Even though there is a `Dockerfile` and a Docker Compose project in this source tree, we do not test much on it so stuffs inside may break.

## What about contributions?

We welcome pull requests and sponsors, btw.
