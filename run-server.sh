#!/bin/sh

export REGISTRY="gcr.io/spotichercher"

docker run "${REGISTRY}/server" \
  --env SPOTIFY_CLIENT_ID= \
  --env SPOTIFY_CLIENT_SECRET= \
  --env JWT_SECRET=