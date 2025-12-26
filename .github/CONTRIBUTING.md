# Contribution 101

## Welcome on board, Doctor

We are delighted to see that you want to send your contribution(s) to be merged into this repository.

However, as we are a fairly large team, that means we also put the code quality and review time as our number one priority. In order to save time, I would like you to fill the following "form" to help us triaging more efficently:

## Editor of Choice

We don't even care about what editor you write code in, be it VSCode or WebStorm.

To be serious, anything that implements the [LSP specification](https://en.wikipedia.org/wiki/Language_Server_Protocol) for TypeScript should be the bare minimum. I won't judge you if you ever use (Neo)Vim, Zed, Helix or Emacs.

## Code contributions

- Make sure you use the search box for PR. Someone might be doing the same thing you are working on.

- Make sure you use the search box for issues. Someone might have the same issue as yours.

- We always use the **LOWER MAJOR** of the ***nearest two*** Node.js LTS version - at the time of writing, Node 22 & 24 - that means we will use Node 22 as baseline.

- When in doubt, Docker could be your friend.

## Docker contributions

- Make sure the added image is in public registry (`hub.docker.com`, `ghcr.io`, `quay.io`, to name a few) and try to avoid lock-in as much as you can, [you know the Bitnami drama right?](https://github.com/bitnami/charts/issues/35164).

## Git contributions

- Each commit should do single thing.
  - Or, you can do multiple things, just keep it small.

- We **DO NOT** use Conventional Commit. Write like you write as a human.

- We use simple present tense for action.

- We start with lower case word, and ends with a period.

- The headline should be short (~70-80 characters), everything else should be written after a double-newline for clarity.

### Good

```txt
apply automatic S3 environment loader.

required by AWS upstream.

- so that Next.js will not complain inside Server Actions.

- so that AWS S3 SDK would not complain about broken IAM.
```

### Bad - for the love of god, please don't do this.

```txt
fix(cms): applied auth check in /api/auth, /api/auth/discord, modified testimonial part of the landing page, use purple primary for TailwindCSS, and changed the constant of Math.PI to 3.41
```
