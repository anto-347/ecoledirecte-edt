#! /usr/bin/env node

import { execSync } from "child_process";
import { Octokit } from "@octokit/rest";

import JsonData from "./json";
import { init } from "./utils";
import { cookieGTK, login } from "./ed";

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
        "Enregistre un identifiant EcoleDirecte dans 'user.json'.",
    )
    .option(
        "-p, --password <password>",
        "Enregistre un mot de passe EcoleDirecte dans 'user.json'.",
    )
    .option(
        "-g, --github <GitHub username>",
        "Enregistre votre nom d'utilisateur GitHub dans 'user.json'.",
    )
    .option(
        "-k, --key <token>",
        "Enregistre votre token d'accès GitHub dans 'user.json'.",
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

if (options.key) {
    init();
    data.githubKey = options.key;
    data.updateJson({ githubKey: options.key });
}

if (options.delete) {
    init();
    execSync("rm -f user/user.json", { stdio: "ignore" });
}

if (options.update) {
    const authOctokit = data.readJson("githubKey");

    if (!authOctokit) {
        console.log("Aucun token GitHub enregistré dans 'user.json'.");
        console.log("Veuillez l'enregistrer avec 'edt -k <token>'.");
    }
    if (!data.readJson("githubUsername")) {
        console.log(
            "Aucun nom d'utilisateur GitHub enregistré dans 'user.json'.",
        );
        console.log("Veuillez l'enregistrer avec 'edt -g <GitHub username>'.");
    }
    if (!data.readJson("username")) {
        console.log(
            "Aucun nom d'utilisateur EcoleDirecte enregistré dans 'user.json'.",
        );
        console.log("Veuillez l'enregistrer avec 'edt -u <identifiant>'.");
    }
    if (!data.readJson("password")) {
        console.log(
            "Aucun mot de passe EcoleDirecte enregistré dans 'user.json'.",
        );
        console.log("Veuillez l'enregistrer avec 'edt -p <password>'.");
    } else {
        const cookie = await cookieGTK();
        console.log(cookie, typeof cookie);
        // const { token, id } = login(data, cookie);

        const octokit = new Octokit({ auth: data.readJson("githubKey") });
    }
}

if (!process.argv.slice(2).length) {
    init();
    program.outputHelp();
}
