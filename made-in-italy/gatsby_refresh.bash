#!/bin/bash
cd /app
gatsby build
service nginx reload
