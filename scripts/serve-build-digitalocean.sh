#!/bin/bash

if [[ -x envvars ]]; then
    echo "sourcing app specific environment variables..."
    source envvars
fi

gulp serve-build --nosync