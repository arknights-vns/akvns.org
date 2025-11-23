# Contribution 101

## Editor of Choice

We !care a lot about what editor you write code in, be it VSCode or WebStorm.

To be serious, anything that implements the LSP specs for TypeScript should be the bare minimum. I won't judge you if you ever use (Neo)Vim, Zed, Helix or Emacs.

## Code contributions

- Make sure you use the search box for PR. Someone might be doing the same thing you are working on.

- Make sure you use the search box for issues. Someone might have the same issue as yours.

- We always use the **LOWER** of the ***nearest two*** Node.js LTS version - at the time of writing, Node 22 & 24 - that means we will use Node 22 as baseline.

- When in doubt, Docker could be your friend.

## Docker contributions

- Make sure the added image is in public registry (`hub.docker.com`, `ghcr.io`, `quay.io`, to name a few) and try to avoid lock-in as much as you can, [you know the Bitnami drama right?](https://github.com/bitnami/charts/issues/35164).

- When using custom built image, [like our own PostgreSQL](https://github.com/arknights-vns/postgresql-17), we would like to ask you to include the source code for the said image (that means it must have a `Dockerfile`) inside the pull request.

## Git contributions

- Each commit should do single thing.

- Do not write like you just played [Needy Streamer Overload](https://store.steampowered.com/app/1451940/NEEDY_STREAMER_OVERLOAD/) for 21 hours straight.
  ![Image](https://github.com/user-attachments/assets/c11f66d0-bc08-4b78-a2dc-e7c8959ae8da)

- We **DO NOT** use Conventional Commit.

- We use simple present tense for action.

- We start with lower case word, and ends with a period.

- The headline should be short, like around 70-80 characters, everything else should be written after a double-newline.
  - Add double-newline after each line.

> Good

```txt
apply automatic S3 environment loader.

required by AWS upstream.

- so that Next.js will not complain inside Server Actions.

- so that AWS S3 SDK would not complain about broken IAM.
```

> Bad - for the love of god, please don't do this.

```txt
fix(cms): applied auth check in /api/auth, /api/auth/discord, modified testimonial part of the landing page, use purple primary for TailwindCSS, and changed the constant of Math.PI to 3.41
```
