#!/bin/sh

export REGISTRY="gcr.io/spotichercher"

docker run "${REGISTRY}/webapp-prod:latest"