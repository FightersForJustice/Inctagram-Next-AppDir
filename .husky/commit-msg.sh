#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

message="$(cat $1)"
requiredPattern="^(add|cut|fix|bump|make|start|stop|refactor|reformat|optimise|document|merge) .*$"
if ! [[ $message =~ $requiredPattern ]];
then
  echo "-"
  echo "-"
  echo "-"
  echo "🚨 Wrong commit message! 😕"
  echo "The commit message must have this format:"
  echo "<verb in imperative mood> <what was done>"
  echo "Allowed verbs in imperative mood: add, cut, fix, bump, make, start, stop, refactor, reformat, optimise, document, merge"
  echo "Example: add login button"
  echo "-"
  echo "Your commit message was:"
  echo $message
  echo "-"
  echo "For more information, check script in .husky/commit-msg"
  echo "-"
  exit 1
fi