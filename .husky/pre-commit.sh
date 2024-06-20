#!/usr/bin/env sh
. ".husky/husky.sh"

if [ -z "\\$1" ]; then
  echo "Error: Missing argument for commit message file."
  exit 1
fi

message=$(cat "\\$1")
requiredPattern="^(add|cut|fix|bump|make|start|stop|refactor|reformat|optimise|document|merge) .*$"
if ! echo "$message" | grep -Eq "$requiredPattern"; then
  echo "🚨 Wrong commit message!"
  echo $message
  echo "The commit message must have this format:"
  echo "<verb in imperative mood> <what was done>"
  echo "Allowed verbs in imperative mood: add, cut, fix, bump, make, start, stop, refactor, reformat, optimise, document, merge"
  echo "Example: add login button"
  exit 1
fi
