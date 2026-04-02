load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let container = doc.select(".detail").first();

        if (container) {
            let coverImg = container.select("img").first().attr("src");
            if (coverImg && coverImg.startsWith("//")) {
                coverImg = "https:" + coverImg;
            } else if (coverImg && coverImg.startsWith("/")) {
                coverImg = BASE_URL + coverImg;
            }

            let genres = [];
            container.select("p a.layui-btn").forEach(e => {
                genres.push({
                    title: e.text().trim(),
                    input: e.attr("href"),
                    script: "gen.js"
                });
            });

            let detail = "";
            let updateTime = container.select("p:contains(最后更新)").text().trim();
            let wordCount = container.select("span.layui-bg-red").text().trim();
            let latestChap = container.select("p.new").text().trim();

            if (wordCount) detail += "📊 Scale: " + wordCount + "<br>";
            if (updateTime) detail += "⏰ " + updateTime + "<br>";
            if (latestChap) detail += "📖 " + latestChap + "<br>";

            let statusText = container.select("span.layui-btn-normal").text();
            let isOngoing = true;
            if (statusText.includes("完结") || statusText.includes("Full")) {
                isOngoing = false;
            }

            let introEl = doc.select("p.intro").first() || doc.select(".intro").first();
            let description = introEl ? introEl.html() : "Nothing.";
            description = url;

            return Response.success({
                name: container.select("p.name").text().trim(),
                cover: coverImg,
                author: container.select("p.author a").text().trim(),
                description: description,
                detail: detail,
                ongoing: isOngoing,
                genres: genres,
                host: BASE_URL
            });
        }
    }

    return null;
}