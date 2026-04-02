load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    let url = "";
    let cookieStr = "Hm_lvt_3094b20ed277f38e8f9ac2b2b29d6263=1775153017; Hm_lvt_f690f2321d66bd8a2db7edc69c11f3da=1775153017";
    if (page === '1') {
        let response = fetch(BASE_URL + "/search.html", {
            method: "POST",
            body: {
                "searchkey": key
            },
            headers: {
             "Cookie": cookieStr,
             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        if (response.ok) {
            url = response.url();
        }
    } else {
        url = page;
    }

    if (url) {
        let response = fetch(url, {
            headers: {
                "Cookie": cookieStr,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });
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