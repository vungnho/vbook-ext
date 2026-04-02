load('config.js');
load('config.js');
function execute(url) {
    url = url.replace(/\/$/, "");
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        let lastPageNode = doc.select(".caption a:contains(尾页)").first();

        let totalPages = 1;
        let bookId = url.split('/').pop();

        if (lastPageNode) {
            let href = lastPageNode.attr("href");

            let match = /_(\d+)/.exec(href);
            if (match) {
                totalPages = parseInt(match[1]);
            }
        }

        let list = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1) {
                list.push(BASE_URL + "/" + bookId + "/");
            } else {
                list.push(BASE_URL + "/" + bookId + "_" + i + "/");
            }
        }

        return Response.success(list);
    }
    return null;
}