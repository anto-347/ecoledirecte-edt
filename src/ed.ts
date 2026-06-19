import JsonData from "./json";

export async function cookieGTK(): Promise<string | null> {
    const gtkR = await fetch(
        "https://api.ecoledirecte.com/v3/login.awp?gtk=1&v=4.75.0",
        { method: "GET" },
    );

    return gtkR.headers.get("set-cookie");
}

export async function login(json: JsonData, cookie: string): Promise<string[]> {
    const loginBody = JSON.stringify({
        identifiant: json.readJson("username"),
        motdepasse: json.readJson("password"),
        isRelogin: false,
        uuid: "",
    });

    const loginR = await fetch(
        "https://api.ecoledirecte.com/v3/login.awp?v=4.75.0",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "X-Gtk": cookie,
            },
            body: `data=${encodeURIComponent(loginBody)}`,
        },
    );

    const loginData = await loginR.json();

    console.log(`code : ${loginData.code}`);
    const token = loginData.token;
    const eleveId = loginData.data.account[0].id;

    return [token, eleveId];
}
