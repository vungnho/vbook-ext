load('config.js');
function execute() {
    let response = fetch(BASE_URL + "/sort.html");
    if (response.ok) {
        let doc = response.html();
        let genres = [];
        let seenLinks = new Set();
        seenLinks.add(BASE_URL + "/shuku/");
        seenLinks.add(BASE_URL + "/allsort/");

        doc.select("ul.sort li a").forEach(e => {
            let title = e.text().trim();
            let link = e.attr("href");

            if (title && link && !link.includes("javascript")) {
                let fullLink = link;
                if (link.indexOf("http") !== 0) {
                    fullLink = BASE_URL + (link.indexOf("/") === 0 ? "" : "/") + link;
                }

                if (!seenLinks.has(fullLink)) {
                    genres.push({
                        title: title,
                        input: fullLink,
                        script: "gen.js"
                    });
                    seenLinks.add(fullLink);
                }
            }
        });

        return Response.success(genres);
    }

    return null;
}