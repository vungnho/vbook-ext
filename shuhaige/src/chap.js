load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let contentElement = doc.select(".truyen").first();

        if (contentElement) {
            contentElement.select("script, ins, div, style").remove();

            let content = contentElement.html();

            content = content.replace(/&nbsp;/g, " ");
            content = content.replace(/<br\s*\/?>\s*<br\s*\/?>/g, "<br><br>");

            return Response.success(content);
        }
    }

    return null;
}