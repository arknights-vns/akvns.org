# Contribution guide 101

## Code contributions

1. Make sure you use the search box for PR. Someone might be doing the same thing you are working on.

2. Make sure you use the search box for issues. Someone might have the same issue as yours.

3. We always use the LOWER Node.js LTS version - at the time of writing, Node 22 & 24 - that means we will use Node 22.

4. When in doubt, Docker could be your friend.

## Git contributions

- Each commit should do single thing.
- Do not write like you just played [Needy Streamer Overload](https://store.steampowered.com/app/1451940/NEEDY_STREAMER_OVERLOAD/) 21 hours straight.
  <img width="455" height="127" alt="{396360D5-D7DB-4613-BC52-48FF3EA00BD7}" src="https://github.com/user-attachments/assets/c11f66d0-bc08-4b78-a2dc-e7c8959ae8da" />

- We **DO NOT** use Conventional Commit.
- We use simple present tense for action.
- We start with lower case word, and ends with a period.
- The headline should be short, like around 70-80 characters, everything else should be written after a double-newline.
    - Add double-newline after each line.

> Good:
```
apply automatic S3 environment loader.

required by AWS upstream.

- so that Next.js will not complain inside Server Actions.

- so that AWS S3 SDK would not complain about broken IAM.
```

> Bad:
```
fix(cms): applied auth check in /api/auth, /api/auth/discord, modified testimonial part of the landing page, use purple primary for TailwindCSS, and changed the constant of Math.PI to 3.41
```
