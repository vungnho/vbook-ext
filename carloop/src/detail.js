function execute(url) {
    const doc = Http.get(url).html();

    const el = doc.select("div.genres-item");
    const genre = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        genre.push({
            name: e.text(),
            link: e.attr("href"),
        });
    }

    return Response.success({
        name: doc.select("h1.title-detail").text(),
        cover: doc.select("div.col-image img").attr("src"),
        author: doc.select("ul.list-info > li.author > p.col-xs-8").text(),
        description: doc.select("div.detail-content > p").html(),
        detail: doc.select("ul.list-info > li.author > p.col-xs-8").text(),
        ongoing: doc.select("ul.list-info > li.status > p.col-xs-8").text().indexOf("Đang tiến hành") != -1,
        genres: genre,
        host: "https://carloop.io"
    });
}
