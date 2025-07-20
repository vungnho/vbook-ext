function execute() {
    const doc = Http.get("https://carloop.io/").html();
    const el = doc.select("div.megamenu > div.container > ul.nav-links > li > a");
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            title: e.text(),
            input: "https://carloop.io" + e.attr("href") + "?page=",
            script: "gen.js"
        });
    }
    return Response.success(data);
}
