#!/bin/sh

export REGISTRY="gcr.io/spotichercher"

docker run --env-file server-env.list "${REGISTRY}/server"