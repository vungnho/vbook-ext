load('config.js');
function execute() {
    let response = fetch(BASE_URL + "/search");
    if (response.ok) {
        let doc = response.html();
        let genres = [];

        doc.select(".menu-subs li a").forEach(e => {
            let title = e.text().trim();
            let link = e.attr("href");

            if (title && link && !link.includes("javascript")) {
                genres.push({
                    title: title,
                    input: link,
                    script: "gen.js"
                });
            }
        });
        return Response.success(genres);
    }

    return null;
}