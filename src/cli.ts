#!/usr/bin/env node
// import { argv } from "yargs";
import dotenv from "dotenv";
import { update } from "./updater";

dotenv.config();

const username = process.env.GATSBY_DRUPAL_USERNAME;
const password = process.env.GATSBY_DRUPAL_PASSWORD;
const server = process.env.GATSBY_DRUPAL_SERVER;

update(username, password, server);
