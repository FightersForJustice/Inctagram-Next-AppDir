#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Custom script to add a tag
TAG_NAME="v$(date +%Y%m%d%H%M%S)"
git tag $TAG_NAME
git push origin $TAG_NAME
