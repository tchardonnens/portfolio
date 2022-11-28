#!/bin/bash

docker build . -t ghcr.io/tchardonnens-ledger/portfolio
docker push ghcr.io/tchardonnens-ledger/portfolio