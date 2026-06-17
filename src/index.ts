#! /usr/bin/env node

import { execSync } from "child_process";
import JsonData from "./json";

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
    .option("-r, --repo <url>", "Enregistre l'url du repo dans 'user.json'.")
    .option("-U, --update", "Met à jour le fichier '.ics' sur le repo")
    .option("-d, --delete", "Supprime le fichier 'user.json'.")
    .addHelpText("beforeAll", figlet.textSync("EDT - EcoleDirecte"))
    .parse(process.argv);

const options = program.opts();
let data = new JsonData();

if (options.username) {
    try {
        data.username = options.username;
    } catch {
        const directory = execSync("ls", { encoding: "utf-8" }).split("\n");
        if (!directory.includes("user"))
            execSync("mkdir user", { stdio: "ignore" });
        execSync("touch ./user/user.json", { stdio: "ignore" });
        data.username = options.username;
    } finally {
        data.updateJson();
    }
}

if (options.password) {
    try {
        data.password = options.password;
    } catch {
        const directory = execSync("ls", { encoding: "utf-8" }).split("\n");
        if (!directory.includes("user"))
            execSync("mkdir user", { stdio: "ignore" });
        execSync("touch ./user/user.json", { stdio: "ignore" });
        data.password = options.password;
    } finally {
        data.updateJson();
    }
}

if (options.repo) {
    try {
        data.repoUrl = options.repo;
    } catch {
        const directory = execSync("ls", { encoding: "utf-8" }).split("\n");
        if (!directory.includes("user"))
            execSync("mkdir user", { stdio: "ignore" });
        execSync("touch ./user/user.json", { stdio: "ignore" });
        data.repoUrl = options.repo;
    } finally {
        data.updateJson();
    }
}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
