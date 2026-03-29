load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url, {
        method: "GET",
        queries: {
            page: page
        }
    });

    if (response.ok) {
        let doc = response.html();
        let next = doc.select(".phan-trang a.active + a").text();

        let data = [];
        doc.select(".truyen-list .item").forEach(e => {
            let imgElement = e.select(".cover img").first();
            let coverImg = imgElement ? imgElement.attr("src") : "";

            if (coverImg && coverImg.startsWith("//")) {
                coverImg = "https:" + coverImg;
            }

            let titleAnchor = e.select("h3 a").first();

            let chapterInfo = "";
            e.select(".line").forEach(line => {
                if (line.text().contains("Số chương")) {
                    chapterInfo = line.text().trim();
                }
            });

            data.push({
                name: titleAnchor ? titleAnchor.text() : "",
                link: titleAnchor ? titleAnchor.attr("href") : "",
                cover: coverImg,
                description: chapterInfo,
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }

    return null;
}