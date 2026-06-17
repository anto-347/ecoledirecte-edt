import * as fs from "fs";
import { execSync } from "child_process";

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

    updateJson(): void {
        const data = {
            username: this.readJson("username"),
            password: this.readJson("password"),
            repoUrl: this.readJson("repoUrl"),
        };
        console.log(data);
        fs.writeFileSync(
            "./user/user.json",
            JSON.stringify(data, null, 2),
            "utf-8",
        );
    }

    readJson(dataType: string | null = null): string[] | string {
        try {
            const content = fs.readFileSync("./user/user.json", "utf-8");
        } catch {
            execSync("touch ./user/user.json", { stdio: "ignore" });
        } finally {
            const content = fs.readFileSync("./user/user.json", "utf-8");
            const data = JSON.parse(content);

            if (!dataType) {
                return data;
            }
            return data[`${dataType}`];
        }
    }
}
