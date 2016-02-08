/* global util */
/// <reference path="typings/node/node.d.ts" />

"use strict";

let watch = require('watch');
let fs = require('fs');
let path = require('path');
let Client = require('scp2').Client;
let ScpRequest = require('./scp-request');
let FS = require('fs');

let client = new Client();

function main() {
  let config_file_name = (process.argv.length > 2) ? process.argv[2] : './config.json';
  let config = JSON.parse(fs.readFileSync(config_file_name, 'utf8'));
  init(config);
  beginWatch(config);

  console.log("Watching " + config.watchPath + "...");
}

function init(config) {
  // read the private key file contents
  config.scpConfig.privateKey = fs.readFileSync(config.scpConfig.privateKey);

  // setup scp defaults
  client.defaults(config.scpConfig);
}

function onWatch(config, f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
      console.log('Finished walking file tree.');
    } else if (prev === null) {
      // f is a new file
      new ScpRequest(config, f).run(client);
    } else if (curr.nlink === 0) {
      // f was removed
      console.log(`!!! FILE WAS DELETED !!! NOT IMPLEMENTED !!! - ${curr}`);
    } else {
      // f was changed
      new ScpRequest(config, f).run(client);
    }
}

function beginWatch(config) {
    watch.watchTree(
        config.watchPath,
        config.watchConfig,
        (f, curr, prev) => onWatch(config, f, curr, prev)
    );
}

main();
