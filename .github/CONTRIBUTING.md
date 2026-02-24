# Contribution 101

Welcome on board, Doctor!

We are delighted to see that you want to send your contribution(s) to be merged into this repository.

However, as we are a small team & work on voluntary. Hence, in order to save time, I would like you to follow these things.

## Editor of Choice

We don't even care about what editor you write code in, be it VSCode or WebStorm.

To be serious, anything that implements the [LSP specification](https://en.wikipedia.org/wiki/Language_Server_Protocol) for [TypeScript Language Server](https://github.com/typescript-language-server/typescript-language-server) should be the bare minimum. We won't judge you if you ever use (Neo)Vim, Zed, Helix or Emacs.

## Our stance on Generative AI ("GenAI" hereafter)

[The parent group, of which this team is based onto, strictly prohibits usage of GenAI in artistic materials, and this project counts as one](https://www.facebook.com/groups/arknights.vietnam.station/about) - rule #3. However, as a gesture of generosity, we allow you to use GenAI, with conditions: be [prepared for questions](https://hackerone.com/reports/2823554), and we hope you are able to [answer it clearly](https://hackerone.com/reports/2871792).

## Code contributions

- We do not require a PR to be linked with an issue, however, having one is a nice QoL shall we?

- Make sure you use the search box to check for existing PR and/or issues.

- We always use the **lowest** of the Node.js LTS versions - at the time of writing, Node 22 & 24 - that means we will use Node 22 as baseline.

- When in doubt, Docker could be your friend.

## Docker contributions (in case there is one)

- Make sure the image is in public registry (`hub.docker.com`, `ghcr.io`, `quay.io`, to name a few) and not behind auth.

- Try to avoid lock-in as much as you can, [you know the Bitnami drama right?](https://github.com/bitnami/charts/issues/35164).

## Git contributions

- Each commit should do single thing.

  - Or, you can do multiple things, just keep it small.

- We **DO NOT** use Conventional Commit for commit messages. Write like you write as a human.

  - We (mostly) use simple present tense for action.

  - We (mostly) start with lower case word, and ends with a period.

  - We are not a professional team so joking is allowed *where appropriate*, just don't make it like the mental asylum.

- The headline should be short (~70-80 characters), everything else should be written after a double-newline for clarity.

### Good

```txt
apply automatic S3 environment loader.

required by AWS upstream.

- so that Next.js will not complain inside Server Actions.

- so that AWS S3 SDK would not complain about broken IAM.
```

### Bad - for the love of god, please don't do this

```txt
fix(cms): applied auth check in /api/auth, /api/auth/discord, modified testimonial part of the landing page, use purple primary for TailwindCSS, and changed the constant of Math.PI to 3.41
```
