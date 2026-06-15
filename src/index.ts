#! /usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();

console.log(figlet.textSync("EDT - EcoleDirecte"));

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
    .parse(process.argv);

const options = program.opts();
