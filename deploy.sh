#!/bin/bash

cd ./build
FILES=$(find * -type f | awk -v q="'" '{print " -F " q "file=@\"" $0 "\";filename=\"" $0 "\"" q}')
curl "https://ipfs.infura.io:5001/api/v0/add?pin=true&recursive=true&wrap-with-directory=true&cid-version=1" -vv -X POST $FILES
cd ..
#bafybeidxvz3on3bpnslibdyl25hrjbzsjulw4hg6awofai6wlp3edip47y
# https://bafybeidxvz3on3bpnslibdyl25hrjbzsjulw4hg6awofai6wlp3edip47y.ipfs.dweb.link/#/