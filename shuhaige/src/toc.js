load('config.js');

function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        let chapters = [];
        doc.select("ul.read li a").forEach(e => {
            let name = e.text().trim();
            let link = e.attr("href");

            if (link) {
                chapters.push({
                    name: name,
                    url: link,
                    host: BASE_URL
                });
            }
        });

        return Response.success(chapters);
    }
    return null;
}