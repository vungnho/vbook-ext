load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let coverImg = doc.select(".book-info-pic img").first().attr("src");
        if (coverImg && coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }

        let genres = [];
        doc.select(".li--genres a").forEach(e => {
            genres.push({
                title: e.text(),
                input: e.attr("href"),
                script: "gen.js"
            });
        });

        let detail = "";
        let introPart = doc.select("p.intro").first();
        if (introPart) {
            detail += "🔔 " + introPart.text().trim() + "<br>---<br>";
        }

        doc.select(".book-info-text ul li").forEach(li => {
            detail += li.text().trim() + "<br>";
        });

        let descEl = doc.select(".scrolltext").first();
        if (descEl) {
            descEl.select(".intro").remove();
            descEl.select("h3").remove();
        }
        let description = descEl ? descEl.html() : "";

        let statusText = doc.select(".label-status").text();
        let isOngoing = true;
        if (statusText.includes("Full") || statusText.includes("Hoàn thành")) {
            isOngoing = false;
        }

        return Response.success({
            name: doc.select("h1[itemprop=name]").first().text(),
            cover: coverImg,
            author: doc.select("a[itemprop=author]").first().text(),
            description: description,
            detail: detail,
            ongoing: isOngoing,
            genres: genres,
            host: BASE_URL
        });
    }

    return null;
}