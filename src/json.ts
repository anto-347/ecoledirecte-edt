import * as fs from "fs";
import { type dataJson } from "./utils";

export default class JsonData {
    public _username: string;
    public _password: string;
    public _githubUsername: string;
    // public _githubKey

    constructor() {
        this._username = "";
        this._password = "";
        this._githubUsername = "";
    }

    public get username(): string {
        return this._username;
    }

    public set username(u: string) {
        this._username = u;
    }

    public get password(): string {
        return this._password;
    }

    public set password(p: string) {
        this._password = p;
    }

    public get githubUsername(): string {
        return this._githubUsername;
    }

    public set githubUsername(g: string) {
        this._githubUsername = g;
    }

    updateJson({
        username,
        password,
        githubUsername,
    }: {
        username?: string;
        password?: string;
        githubUsername?: string;
    } = {}): void {
        let presentUsername: string;
        let presentPassword: string;
        let presentGithubUsername: string;

        username
            ? (presentUsername = username)
            : (presentUsername = this.readJson("username") as string);

        password
            ? (presentPassword = password)
            : (presentPassword = this.readJson("password") as string);

        githubUsername
            ? (presentGithubUsername = githubUsername)
            : (presentGithubUsername = this.readJson(
                  "githubUsername",
              ) as string);

        const data = {
            username: presentUsername,
            password: presentPassword,
            githubUsername: presentGithubUsername,
        };

        fs.writeFileSync(
            "./user/user.json",
            JSON.stringify(data, null, 2),
            "utf-8",
        );
    }

    readJson(dataType: dataJson | null = null): string[] | string {
        try {
            const content = fs.readFileSync("./user/user.json", "utf-8");
            const data = JSON.parse(content);

            if (!dataType) {
                return data;
            }
            return data[`${dataType}`];
        } catch {
            return "";
        }
    }
}
