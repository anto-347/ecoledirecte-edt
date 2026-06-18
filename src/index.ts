#! /usr/bin/env node

import { execSync } from "child_process";
import JsonData from "./json";
import { init } from "./utils";

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();

program
    .version("1.0.0")
    .description(
        "CLI pour mettre à jour votre EDT sur votre calendrier personnel.",
    )
    .option(
        "-u, --username <identifiant>",
        "Enregistre un identifiant dans 'user.json'.",
    )
    .option(
        "-p, --password <password>",
        "Enregistre un mot de passe dans 'user.json'.",
    )
    .option(
        "-g, --github <GitHub username>",
        "Enregistre votre nom d'utilisateur GitHub dans 'user.json'.",
    )
    .option("-U, --update", "Met à jour le fichier '.ics' sur le repo")
    .option("-d, --delete", "Supprime le fichier 'user.json'.")
    .addHelpText("beforeAll", figlet.textSync("EDT - EcoleDirecte"))
    .parse(process.argv);

const options = program.opts();
let data: JsonData = new JsonData();

if (options.username) {
    init();
    data.username = options.username;
    data.updateJson({ username: options.username });
}

if (options.password) {
    init();
    data.password = options.password;
    data.updateJson({ password: options.password });
}

if (options.github) {
    init();
    data.githubUsername = options.github;
    data.updateJson({ githubUsername: options.github });
}

if (options.delete) {
    init();
    execSync("rm -f user/user.json", { stdio: "ignore" });
}

if (options.update) {
    //
}

if (!process.argv.slice(2).length) {
    init();
    program.outputHelp();
}
