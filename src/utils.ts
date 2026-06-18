import { execSync } from "child_process";

export const init = (): void => {
    const directory: string[] = execSync("ls", { encoding: "utf-8" }).split(
        "\n",
    );
    if (!directory.includes("user"))
        execSync("mkdir user", { stdio: "ignore" });

    const directory_user: string[] = execSync("ls user", {
        encoding: "utf-8",
    }).split("\n");
    if (!directory_user.includes("user.json"))
        execSync("touch ./user/user.json", { stdio: "ignore" });
};

export type dataJson = "username" | "password" | "githubUsername";
