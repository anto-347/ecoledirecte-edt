import * as fs from "fs";
import { type dataJson } from "./utils";

export default class JsonData {
    public _username: string;
    public _password: string;
    public _githubUsername: string;
    public _githubKey: string;

    constructor() {
        this._username = "";
        this._password = "";
        this._githubUsername = "";
        this._githubKey = "";
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

    public get githubKey(): string {
        return this._githubKey;
    }

    public set githubKey(k: string) {
        this._githubKey = k;
    }

    updateJson({
        username,
        password,
        githubUsername,
        githubKey,
    }: {
        username?: string;
        password?: string;
        githubUsername?: string;
        githubKey?: string;
    } = {}): void {
        let presentUsername: string;
        let presentPassword: string;
        let presentGithubUsername: string;
        let presentGithubKey: string;

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

        githubKey
            ? (presentGithubKey = githubKey)
            : (presentGithubKey = this.readJson("githubKey") as string);

        const data = {
            username: presentUsername,
            password: presentPassword,
            githubUsername: presentGithubUsername,
            githubKey: presentGithubKey,
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
