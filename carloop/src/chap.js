function execute(url) {
    const doc = Http.get(url).html();
    const el = doc.select("div.reading-detail > div.page-chapter > img");
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push(e.attr("src"));
    }
    return Response.success(data);
}
