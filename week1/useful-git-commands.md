# Useful Git Commands for Beginners

## Basic Commands (Start Here)

### `git init`

- **Description:** Creates a new Git repository in the current directory.
- **When to use:** When starting a new project and you want to track changes with Git.

### `git clone <repository-url>`

- **Description:** Downloads a copy of an existing repository from a remote source (like GitHub).
- **When to use:** When you want to work on an existing project or contribute to someone else's code.
- **Example:** `git clone https://github.com/username/project.git`

### `git status`

- **Description:** Shows the current state of your working directory and staging area.
- **When to use:** Anytime you want to see which files have been modified, added, or deleted.

### `git add <filename>`

- **Description:** Adds a specific file to the staging area (prepares it for commit).
- **When to use:** When you want to include specific changes in your next commit.
- **Example:** `git add index.html`

### `git add .`

- **Description:** Adds all modified and new files to the staging area.
- **When to use:** When you want to stage all changes at once.

### `git commit -m "message"`

- **Description:** Saves your staged changes to the repository with a descriptive message.
- **When to use:** After staging files, to create a snapshot of your project.
- **Example:** `git commit -m "Add login functionality"`

### `git log`

- **Description:** Shows the commit history of the repository.
- **When to use:** When you want to see what changes have been made and by whom.

### `git log --oneline`

- **Description:** Shows a simplified, one-line-per-commit version of the commit history.
- **When to use:** When you want a quick overview of recent commits.

### `git diff`

- **Description:** Shows the differences between your working directory and the last commit.
- **When to use:** When you want to see exactly what changes you've made before staging them.

### `git diff --staged`

- **Description:** Shows the differences between staged changes and the last commit.
- **When to use:** When you want to review what you're about to commit.

## Branching Commands

### `git branch`

- **Description:** Lists all branches in your repository (current branch marked with `*`).
- **When to use:** When you want to see what branches exist.

### `git branch <branch-name>`

- **Description:** Creates a new branch.
- **When to use:** When you want to work on a new feature or experiment without affecting the main code.
- **Example:** `git branch feature-login`

### `git checkout <branch-name>`

- **Description:** Switches to a different branch.
- **When to use:** When you want to work on a different branch.
- **Example:** `git checkout feature-login`

### `git checkout -b <branch-name>`

- **Description:** Creates a new branch and switches to it immediately.
- **When to use:** Shortcut for creating and switching to a new branch in one command.
- **Example:** `git checkout -b feature-signup`

### `git merge <branch-name>`

- **Description:** Merges the specified branch into your current branch.
- **When to use:** When you want to combine changes from one branch into another.
- **Example:** `git merge feature-login` (while on `main` branch)

### `git branch -d <branch-name>`

- **Description:** Deletes a branch that has been merged.
- **When to use:** When you're done with a feature branch and want to clean up.
- **Example:** `git branch -d feature-login`

## Remote Repository Commands (GitHub/GitLab)

### `git remote add origin <repository-url>`

- **Description:** Connects your local repository to a remote repository.
- **When to use:** After creating a local repo and you want to push it to GitHub/GitLab.
- **Example:** `git remote add origin https://github.com/username/project.git`

### `git remote -v`

- **Description:** Shows the remote repositories connected to your local repo.
- **When to use:** When you want to verify which remote repositories you're connected to.

### `git push origin <branch-name>`

- **Description:** Uploads your commits to the remote repository.
- **When to use:** When you want to share your changes with others or back up your work.
- **Example:** `git push origin main`

### `git push -u origin <branch-name>`

- **Description:** Uploads commits and sets the upstream branch for future pushes.
- **When to use:** First time pushing a new branch to remote.
- **Example:** `git push -u origin feature-login`

### `git pull`

- **Description:** Downloads and merges changes from the remote repository to your current branch.
- **When to use:** When you want to get the latest changes from your team.

### `git fetch`

- **Description:** Downloads changes from remote but does not merge them.
- **When to use:** When you want to see what others have done without merging yet.

## Advanced Commands (Fixing Mistakes and History)

### `git revert <commit-hash>`

- **Description:** Creates a new commit that undoes the changes from a specific commit.
- **When to use:** When you want to undo a commit that has already been pushed to remote (safe option).
- **Example:** `git revert a1b2c3d4`
- **Note:** Safer than reset because it does not rewrite history.

### `git reset --soft HEAD~1`

- **Description:** Undoes the last commit but keeps the changes staged.
- **When to use:** When you want to modify your last commit or split it into multiple commits.

### `git reset --hard HEAD~1`

- **Description:** Undoes the last commit and discards all changes.
- **When to use:** When you want to completely remove the last commit and its changes.
- **Warning:** Permanently deletes changes. Use with caution.

### `git reset --hard <commit-hash>`

- **Description:** Resets your branch to a specific commit, discarding all changes after it.
- **When to use:** When you want to go back to a previous state (only local, non-shared branches).
- **Example:** `git reset --hard a1b2c3d4`

### `git stash`

- **Description:** Temporarily saves your uncommitted changes and cleans your working directory.
- **When to use:** When you need to switch branches but are not ready to commit your current work.

### `git stash pop`

- **Description:** Restores the most recently stashed changes.
- **When to use:** When you want to continue working on your stashed changes.

### `git stash list`

- **Description:** Shows all stashed changes.
- **When to use:** When you want to see what changes you've stashed.

### `git cherry-pick <commit-hash>`

- **Description:** Applies the changes from a specific commit to your current branch.
- **When to use:** When you want to copy a specific commit from another branch.
- **Example:** `git cherry-pick a1b2c3d4`

### `git rebase <branch-name>`

- **Description:** Reapplies your commits on top of another branch.
- **When to use:** When you want a linear commit history.
- **Example:** `git rebase main`

### `git commit --amend`

- **Description:** Modifies the most recent commit (message and/or contents).
- **When to use:** When you forgot to include something in your last commit.
- **Example:** `git commit --amend -m "Updated commit message"`

### `git blame <filename>`

- **Description:** Shows who last modified each line of a file.
- **When to use:** When you want to find out who wrote specific code.
- **Example:** `git blame index.html`

### `git tag <tag-name>`

- **Description:** Creates a tag for a specific commit, usually for releases.
- **When to use:** When you want to mark a version release.
- **Example:** `git tag v1.0.0`

### `git show <commit-hash>`

- **Description:** Shows detailed information about a specific commit.
- **When to use:** When you want to inspect what changed in a particular commit.
- **Example:** `git show a1b2c3d4`

## Useful Shortcuts and Tips

### `git config --global user.name "Your Name"`

- **Description:** Sets your name for all Git commits.
- **When to use:** First-time setup.

### `git config --global user.email "your.email@example.com"`

- **Description:** Sets your email for all Git commits.
- **When to use:** First-time setup.

### `git log --graph --oneline --all`

- **Description:** Shows a visual graph of all branches and commits.
- **When to use:** When you want to visualize branch and merge history.

### `git clean -fd`

- **Description:** Removes untracked files and directories.
- **When to use:** When you want to clean your working directory.
- **Warning:** Permanently deletes untracked files.

## Common Workflows

### Starting a new project

1. `git init`
2. `git add .`
3. `git commit -m "Initial commit"`
4. `git remote add origin <url>`
5. `git push -u origin main`

### Working on a feature

1. `git checkout -b feature/name`
2. Make your changes
3. `git add .`
4. `git commit -m "Description of changes"`
5. `git push -u origin feature/name`
6. Create a pull request on GitHub
7. `git checkout main`
8. `git pull`
9. `git branch -d feature/name`

### Fixing a mistake in the last commit

1. Make your fixes
2. `git add .`
3. `git commit --amend`

### Undoing a pushed commit (safe way)

1. `git revert <commit-hash>`
2. `git push`
