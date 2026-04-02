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
                let fullLink = link;
                if (link.indexOf("http") !== 0) {
                    fullLink = BASE_URL + (link.indexOf("/") === 0 ? "" : "/") + link;
                }
                genres.push({
                    title: title,
                    input: fullLink,
                    script: "gen.js"
                });
            }
        });
        return Response.success(genres);
    }

    return null;
}