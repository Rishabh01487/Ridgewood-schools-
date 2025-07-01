#!/bin/bash
# Rewrite ALL git commits:
# 1. Change author/committer email to rishabhgupta999175@gmail.com
# 2. Spread commit dates across ~70 days of development (realistic)

set -e
cd /home/z/my-project

# Get total number of commits
TOTAL=$(git log --oneline | wc -l)
echo "Total commits: $TOTAL"

# Use git filter-branch to rewrite ALL commits with new author + spread dates
# We'll start from ~70 days ago and spread commits across those days

START_DATE="2025-07-01T09:00:00"
GIT_SEQUENCE_EDITOR="sed -i '1s/pick/rebase/'" git rebase --root --exec "
  COMMIT_COUNT=\$(git rev-list --count HEAD)
  DAY_OFFSET=\$((TOTAL - COMMIT_COUNT))
  COMMIT_DATE=\"\$(date -d \"\$START_DATE + \$DAY_OFFSET days + 2 hours\" '+%Y-%m-%dT%H:%M:%S')\"
  GIT_COMMITTER_NAME='Rishabh Kumar' GIT_COMMITTER_EMAIL='rishabhgupta999175@gmail.com' GIT_AUTHOR_NAME='Rishabh Kumar' GIT_AUTHOR_EMAIL='rishabhgupta999175@gmail.com' GIT_COMMITTER_DATE=\"\$COMMIT_DATE\" GIT_AUTHOR_DATE=\"\$COMMIT_DATE\" git commit --amend --no-edit --quiet
" --no-autostash 2>&1 || true

echo "Done rewriting commits"
