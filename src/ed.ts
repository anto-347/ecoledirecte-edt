import JsonData from "./json.js";

export async function cookieGTK(): Promise<string | null> {
    const gtkR = await fetch(
        "https://api.ecoledirecte.com/v3/login.awp?gtk=1&v=4.75.0",
        { method: "GET" },
    );

    const setCookie = gtkR.headers.get("set-cookie") ?? "";
    console.log("set-cookie brut:", setCookie);
    const gtkValue = setCookie.match(/GTK=([^;]+)/)?.[1] ?? "";
    console.log("gtk extrait:", gtkValue);

    return gtkValue;
}

export async function login(
    json: JsonData,
    cookie: string,
): Promise<(string | boolean)[]> {
    const loginBody = JSON.stringify({
        identifiant: json.readJson("username"),
        motdepasse: json.readJson("password"),
        isRelogin: false,
        uuid: "",
    });

    console.log(loginBody);

    const loginR = await fetch(
        "https://api.ecoledirecte.com/v3/login.awp?v=4.75.0",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "X-Gtk": cookie,
                Cookie: `GTK=${cookie}`,
            },
            body: `data=${encodeURIComponent(loginBody)}`,
        },
    );

    const loginData = await loginR.json();
    console.log(JSON.stringify(loginData, null, 2));

    if (loginData.code !== 200) {
        console.log(loginData.message, loginData.code);
        return [false, "", ""];
    }

    const token = loginData.token;
    const eleveId = loginData.data.accounts[0].id;

    return [true, token, eleveId];
}
