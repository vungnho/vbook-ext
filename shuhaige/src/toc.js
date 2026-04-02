load('config.js');
function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let resJson = response.json();
        let doc = Html.parse(resJson.data);

        let chapters = [];
        doc.select(".read li a").forEach(e => {
            chapters.push({
                name: e.text().trim(),
                url: e.attr("href"),
                host: BASE_URL
            });
        });

        return Response.success(chapters);
    }
    return null;
}