load('config.js');
function execute(key, page) {
    if (!page) page = '1';

    let response = fetch(BASE_URL + "/search", {
        method: "GET",
        queries: {"q": key, "page": page}
    });

    if (response.ok) {
        let doc = response.html();
        let next = doc.select(".phan-trang").select("li.active + li").text();

        let data = [];
        doc.select(".truyen-list .item").forEach(e => {
            let imgElement = e.select(".cover img").first();
            let coverImg = imgElement ? imgElement.attr("src") : "";
            if (coverImg && coverImg.startsWith("//")) {
                coverImg = "https:" + coverImg;
            }
            let titleAnchor = e.select("h3 a").first();
            let chapterText = "";
            e.select(".line").forEach(line => {
                if (line.text().includes("Số chương")) {
                    chapterText = line.text().replace("Số chương :", "").trim();
                }
            });

            data.push({
                name: titleAnchor ? titleAnchor.text() : "",
                link: titleAnchor ? titleAnchor.attr("href") : "",
                cover: coverImg,
                description: "Số chương: " + chapterText,
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }

    return null;
}