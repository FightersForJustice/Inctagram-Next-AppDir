#!/bin/sh
# Check if the commit message starts with 'fix', 'feat', or 'bug'

COMMIT_MSG_FILE=\$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)

PREFIX_REGEX="^(fix|feat|bug)"

if ! echo $COMMIT_MSG | grep -Eq $PREFIX_REGEX; then
  echo "Error: Commit message does not start with 'fix', 'feat', or 'bug'."
  exit 1
fi
