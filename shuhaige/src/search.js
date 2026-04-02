load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    let url = "";

    if (page === '1') {
        let response = fetch(BASE_URL + "/search.html", {
            method: "POST",
            body: {
                "searchkey": key
            }
        });

        if (response.ok) {
            url = response.url();
        }
    } else {
        url = page;
    }

    if (url) {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let data = [];

            doc.select("ul.list li").forEach(e => {
                let titleAnchor = e.select("p.bookname a").first();
                let imgElement = e.select("img").first();
                let coverImg = imgElement ? imgElement.attr("src") : "";

                if (coverImg && coverImg.startsWith("//")) {
                    coverImg = "https:" + coverImg;
                }

                data.push({
                    name: titleAnchor.text().trim(),
                    link: titleAnchor.attr("href"),
                    cover: coverImg,
                    description: e.select("p.data").first().text().trim(),
                    host: BASE_URL
                });
            });

            let next = null;
            let nextEl = doc.select(".pagelist a:contains(下一页)").first();
            if (nextEl) {
                let nextHref = nextEl.attr("href");
                if (nextHref) {
                    next = nextHref.indexOf("http") === 0 ? nextHref : BASE_URL + nextHref;
                }
            }

            return Response.success(data, next);
        }
    }

    return null;
}