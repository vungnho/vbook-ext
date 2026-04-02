load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        
        // Tìm thẻ 'Cuối' để lấy tổng số trang và ID truyện
        // Cấu trúc: onclick="page(35492, 61);"
        let lastPageNode = doc.select(".paging a").last();
        let onclickText = lastPageNode.attr("onclick");
        
        let match = /page\((\d+),(\d+)\)/.exec(onclickText);
        
        if (match) {
            let bookId = match[1];
            let totalPages = parseInt(match[2]);
            let list = [];
            
            for (let i = 1; i <= totalPages; i++) {
                list.push(BASE_URL + "/get/listchap/" + bookId + "?page=" + i);
            }
            return Response.success(list);
        }
    }
    return null;
}