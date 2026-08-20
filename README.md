# The tools wall

A practice repository for LiveCA session one. Everything in here is disposable —
you cannot break anything that matters, and that is the point.

**The live page:** https://moderndatainc.github.io/liveca-tools-wall/

Your job today is to get your name onto that page, using the same loop you will
use on real work for the rest of your career.

---

## The loop

Six steps. You will run them once in about twenty minutes, and then they are yours.

| | | |
|---|---|---|
| 1 | **Branch** | Take a sandbox of your own |
| 2 | **Change** | Add your card |
| 3 | **Commit** | Save the point |
| 4 | **Push** | Send it to GitHub |
| 5 | **Review** | Someone else reads it |
| 6 | **Merge** | It becomes real, and appears on the page |

---

## Do it

### Once, at the start

```
gh repo clone moderndatainc/liveca-tools-wall
cd liveca-tools-wall
```

### 1 — Branch

Use your own first name. Everyone can then see whose is whose.

```
git switch -c sarah
```

> Older guides write this as `git checkout -b sarah`. Same thing. `switch` is the
> newer, clearer name for it, and you will meet both.

### 2 — Change

Copy the template to a file named after you, then open it and edit the three lines.

```
cp cards/_template.html cards/sarah.html
open cards/sarah.html
```

Change the name, the tool, and the sentence. Save it.

### 3 — Commit

```
git add cards/sarah.html
git commit -m "Add Sarah's card"
```

`git status` at any point will tell you where you are. Use it freely — it changes
nothing, it only reports.

### 4 — Push

```
git push -u origin sarah
```

### 5 — Open the pull request

```
gh pr create --fill
```

It prints a link. Open it. That page is your proposal: here is what I changed, and why.

### 6 — Review someone else's, then merge it

```
gh pr list
```

Pick one that is not yours. Open it in the browser:

```
gh pr view 3 --web
```

Read the diff under **Files changed**, leave one comment, and approve it. Then merge.

**You do not merge your own.** Somebody else merges yours. That rule is the whole
session in one line.

Within a minute of the merge, refresh the live page. Their card is on it.

---

## If something goes wrong

Nothing here is fatal. The three you are most likely to want:

**"I have made a mess of my file and want to start it again."**

```
git restore cards/sarah.html
```

Throws away your uncommitted edits to that file and returns it to your last commit.
This is the one genuinely destructive command on this page — which is the argument
for committing often.

**"I committed something I did not mean to."**

```
git reset --soft HEAD~1
```

Undoes the commit. Your work stays exactly where it is, just no longer committed.

**"I am lost and I want to know where I am."**

```
git status
git log --oneline -5
```

Neither of these changes anything.

**"I have genuinely lost something."**

```
git reflog
```

Git keeps a log of every position you have been in, for weeks. If it was ever
committed, it is still there. Ask, and we will find it together.

---

## Two people, one line

Everything above is built so you never touch anybody else's file. Real work is not
always that tidy, so we finish by breaking that on purpose.

`tagline.txt` is one line, and it is the only file everyone shares. Two of you will
rewrite it at the same time. The first pull request merges normally. The second one
will say **"This branch has conflicts that must be resolved."**

That message is not an error, and nothing is broken. Git is telling you it found two
answers to the same question and will not pick one for you.

Bring your branch up to date with `main`:

```
git switch main
git pull
git switch sarah
git merge main
```

Open `tagline.txt`. It now looks like this:

```
<<<<<<< HEAD
Your sentence.
=======
Their sentence.
>>>>>>> main
```

The markers are the two versions and nothing more. Delete the three marker lines and
whatever you do not want, until the file reads the way it should. Then:

```
git add tagline.txt
git commit
git push
```

Your pull request is now mergeable. That is the whole of it.

---

## How the page gets built

You will never need to run this, but no part of it should be a mystery:

`build.js` reads every file in `cards/`, drops them into `index.template.html`,
and writes `_site/index.html`. When something lands on `main`, GitHub runs that
script and publishes the result. That is the green tick you will see on your
pull request.

To see it yourself:

```
node build.js
open _site/index.html
```
