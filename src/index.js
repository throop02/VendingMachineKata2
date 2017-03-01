#!/usr/bin/env node

var vm = require('./../src/vendingMachine');
var sesson = new vm.vmSession(process.stdin, console);
sesson.initMachine();