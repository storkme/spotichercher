#!/bin/sh

export REGISTRY="gcr.io/spotichercher"

# don't bother pushing the dev builds until we've set up testing in CI
# docker build -t "${REGISTRY}/webapp-dev" --target dev webapp/ && docker push "${REGISTRY}/webapp-dev"
docker build -t "${REGISTRY}/webapp-prod" --target prod webapp/ && docker push "${REGISTRY}/webapp-prod"
docker build -t "${REGISTRY}/server" server/ && docker push "${REGISTRY}/server"
