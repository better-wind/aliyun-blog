#!/usr/bin/env sh

read -p "Releasing project - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Building"
  npm run build
  echo "Releasing..."


  # commit build
  git add -A
  echo "Enter Commit message: "
  read COMMIT
  git commit -m "$COMMIT"

  # publish
  echo "publishing git..."
  git push origin master

fi
