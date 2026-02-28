# Welcome to Arknights VNS website?

> Yes, it is in English despite the fact that the entire team (at time of writing this) are all Vietnamese.

## What is this project?

Well, this is the public source code for the website [akvns.org](https://akvns.org) and everything under that domain prefix.

## What is inside?

- The dreamchasers websites @ `dreamchasers-*`, with `dev`, `build` and `start` removed for obvious reason.
- The portfolio website @ `www`
- The API layer @ `prts`
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

| Name      | Usage                            | Comments                                                                  |
| --------- | -------------------------------- | ------------------------------------------------------------------------- |
| Next.js   | (kind of) full-stack development | yes, we know [TanStack Start](https://tanstack.com/start/latest) exists.  |
| Elysia.js | The backend layer                | tbf, SaltyAom should have called it Elysia.ts due to how type-safe it is. |
| Prisma    | ORM Layer                        |                                                                           |
| Postgres  | Database                         |                                                                           |
| shadcn/ui | User Interface                   |                                                                           |
| Biome     | Code linter                      |                                                                           |

## What about contributions?

We welcome pull requests and sponsors, btw.
