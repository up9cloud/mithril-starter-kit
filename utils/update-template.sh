#!/bin/bash

__DIR__="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

TARGET_DIR=$__DIR__/../template

rm -fr $TARGET_DIR

git clone --depth=1 --branch=master git@github.com:dhinesh03/mithril-starter-kit.git template
rm -rf $TARGET_DIR/.git

tmp_file=$(mktemp)
jq '.name = "{{ name }}"|.description = "{{ description }}"|.author = "{{ author }}"' $TARGET_DIR/package.json >$tmp_file
mv $tmp_file $TARGET_DIR/package.json
