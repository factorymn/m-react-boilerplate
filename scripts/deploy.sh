#!/bin/bash

echo "Deploy script has started"
npm run build
zip -r smarticon-frontend.zip public scripts server appspec.yml config.js package.json -x *DS_Store
aws s3 cp ./smarticon-frontend.zip s3://smarticon
echo "Deploy script has ended"
