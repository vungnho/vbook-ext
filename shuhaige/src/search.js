load('config.js');

function execute(key, page) {
    let doc;
    let cookieStr = "Hm_lvt_3094b20ed277f38e8f9ac2b2b29d6263=1775153017; Hm_lvt_f690f2321d66bd8a2db7edc69c11f3da=1775153017";
    let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    if (!page || page === '1') {
        let response = fetch(BASE_URL + "/search.html", {
            method: "POST",
            body: { "searchkey": key },
            headers: {
                "Cookie": cookieStr,
                "User-Agent": userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": BASE_URL + "/"
            }
        });

        if (response && response.ok) {
            doc = response.html();
        }
    }
    else {
        let response = fetch(page, {
            headers: {
                "Cookie": cookieStr,
                "User-Agent": userAgent
            }
        });
        if (response && response.ok) {
            doc = response.html();
        }
    }

    if (doc) {
        let data = [];
        let items = doc.select("ul.list li");

        items.forEach(e => {
            let titleAnchor = e.select("p.bookname a").first();
            if (!titleAnchor) return;

            let imgElement = e.select("img").first();
            let coverImg = imgElement ? imgElement.attr("src") : "";

            if (coverImg && coverImg.indexOf("//") === 0) {
                coverImg = "https:" + coverImg;
            } else if (coverImg && coverImg.indexOf("/") === 0) {
                coverImg = BASE_URL + coverImg;
            }

            let author = e.select("p.data a").first().text().trim();
            let tags = e.select("p.data span").text().trim().replace(/\s+/g, " | ");
            let latest = e.select("p.data").last().text().trim();

            data.push({
                name: titleAnchor.text().trim(),
                link: titleAnchor.attr("href"),
                cover: coverImg,
                description: author + " | " + tags + "\n" + latest,
                host: BASE_URL
            });
        });

        let next = null;
        let nextEl = doc.select(".pagelist a:contains(下一页)").first();
        if (nextEl) {
            let nextHref = nextEl.attr("href");
            if (nextHref) {
                next = nextHref.indexOf("http") === 0 ? nextHref : BASE_URL + (nextHref.indexOf("/") === 0 ? "" : "/") + nextHref;
            }
        }

        return Response.success(data, next);
    }

    return null;
}