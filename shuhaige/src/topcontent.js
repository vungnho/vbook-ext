load('config.js');
function execute(url, page) {
    if (!page) page = '1';
    if (url.indexOf("/", url.length - 1) === -1) {
        url += "/";
    }
    let response = fetch(url + page + ".html");

    if (response.ok) {
        let doc = response.html();
        let next = null;
        let lastLink = doc.select(".pagelist a").last();
        if (lastLink && lastLink.text().includes("尾页")) {
            next = +page + 1 + '';
        }

        let data = [];
        let items = doc.select("ul.list li");

        items.forEach(e => {
            let titleAnchor = e.select("p.bookname a").first();
            let name = titleAnchor ? titleAnchor.text().trim() : "";
            let link = titleAnchor ? titleAnchor.attr("href") : "";

            let imgElement = e.select("img").first();
            let coverImg = imgElement ? imgElement.attr("src") : "";

            if (coverImg && coverImg.indexOf("//") === 0) {
                coverImg = "https:" + coverImg;
            } else if (coverImg && coverImg.indexOf("/") === 0) {
                coverImg = BASE_URL + coverImg;
            }

            let dataSection = e.select("p.data").first();
            let author = dataSection.select("a.layui-bg-cyan").text().trim();

            let tags = dataSection.select("span.layui-btn-radius").text().trim().replace(/\s+/g, " | ");

            let intro = e.select("p.intro").text().trim();

            let description = author + (tags ? " | " + tags : "") + "\n" + intro;

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