#!/usr/bin/env bash
# Give someone write access to the wall.
#   ./scripts/add-participant.sh their-github-username
set -euo pipefail

if [ $# -eq 0 ]; then
  echo "usage: $0 <github-username> [<github-username> ...]" >&2
  exit 1
fi

REPO="moderndatainc/liveca-tools-wall"

for USER in "$@"; do
  gh api -X PUT "repos/$REPO/collaborators/$USER" -f permission=push >/dev/null
  echo "invited $USER (write access) — they must accept at https://github.com/$REPO/invitations"
done
