function execute(url) {
    const doc = Http.get(url).html();
    const el = doc.select("div#nt_listchapter > nav > ul > li");
    const data = [];
    for (var i = el.size() - 1; i >= 0; i--) {
        var e = el.get(i);
        data.push({
            name: e.select("a").text(),
            url: e.select("a").attr("href"),
            host: "https://carloop.io"
        });
    }
    return Response.success(data);
}
