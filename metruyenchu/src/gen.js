load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    if (url.indexOf("/", url.length - 1) === -1) {
        url += "/";
    }

    let response = fetch(url, {
        method: "GET",
        queries: {
            page: page
        }
    });

    if (response.ok) {
        let doc = response.html();
        let next = doc.select(".phan-trang a.active + a").text();
        if (!next) {
            next = null;
        }

        let data = [];
        let items = doc.select(".truyen-list .item");

        items.forEach(e => {
            let titleAnchor = e.select("h3 a").first();
            let name = titleAnchor.text().trim();
            let link = titleAnchor.attr("href");

            let imgElement = e.select(".cover img").first();
            let coverImg = imgElement ? imgElement.attr("src") : "";
            if (coverImg && coverImg.indexOf("//") === 0) {
                coverImg = "https:" + coverImg;
            } else if (coverImg && coverImg.indexOf("/") === 0) {
                coverImg = BASE_URL + coverImg;
            }

            let description = "";
            let lines = e.select(".line");
            lines.forEach(line => {
                let text = line.text();
                if (text.indexOf("Số chương") !== -1) {
                    description = text.replace("Số chương :", "Chương:").trim();
                }
            });

            if (!description && lines.size() > 0) {
                description = lines.first().text().trim();
            }

            data.push({
                name: name,
                link: link,
                cover: coverImg,
                description: description,
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }

    return null;
}