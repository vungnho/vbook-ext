load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let content = '';
    let nextPart = url;
    let stopWords = ["书页", "返回目录", "上一章"];

    do {
        let response = fetch(nextPart);
        if (!response.ok) break;

        let doc = response.html();

        let partContent = doc.select("div.content").html();

        if (partContent) {
            content += partContent;
        }

        let nextEl = doc.select("a:contains(下一页)").first();
        if (nextEl) {
            let href = nextEl.attr("href");
            if (href && href !== "#" && href.indexOf("http") !== 0) {
                nextPart = BASE_URL + href;
            } else {
                nextPart = null;
            }
        } else {
            nextPart = null;
        }

    } while (nextPart && nextPart !== url);

    return Response.success(cleanHtml(content));
}

function cleanHtml(content) {
    return content
        .replace(/<p[^>]*>/g, "")
        .replace(/<\/p>/g, "<br><br>")
        .replace(/&nbsp;/g, "")
        .replace(/<(?!br)[^>]+>/g, "")
        .replace(/小主，这个章节后面还有哦[\s\S]*?后面更精彩！/g, "")
        .replace(/喜欢.*?小说网更新速度全网最快。/g, "")
        .replace(/这章没有结束，请点击下一页继续阅读！/g, "")
        .replace(/本小章还未完，请点击下一页继续阅读后面精彩内容！/g, "")
        .replace(/(<br\s*\/?>){3,}/g, '<br><br>')
        .trim();
}