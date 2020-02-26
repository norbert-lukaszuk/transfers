#!/bin/bash
git status
read -p "Commit massage: " msg
echo $msg
git add .
git commit -m"$msg"

