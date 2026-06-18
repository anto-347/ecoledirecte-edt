import * as fs from "fs";
import { execSync } from "child_process";
import { type dataJson } from "./utils";

export default class JsonData {
    public _username: string;
    public _password: string;
    public _repoUrl: string;

    constructor() {
        this._username = "";
        this._password = "";
        this._repoUrl = "";
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

    public get repoUrl(): string {
        return this._repoUrl;
    }

    public set repoUrl(r: string) {
        this._repoUrl = r;
    }

    updateJson({
        username,
        password,
        repoUrl,
    }: { username?: string; password?: string; repoUrl?: string } = {}): void {
        let presentUsername: string;
        let presentPassword: string;
        let presentRepoUrl: string;

        username
            ? (presentUsername = username)
            : (presentUsername = this.readJson("username") as string);

        password
            ? (presentPassword = password)
            : (presentPassword = this.readJson("password") as string);

        repoUrl
            ? (presentRepoUrl = repoUrl)
            : (presentRepoUrl = this.readJson("repoUrl") as string);

        const data = {
            username: presentUsername,
            password: presentPassword,
            repoUrl: presentRepoUrl,
        };
        console.log(data);
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
