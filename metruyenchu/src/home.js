load('config.js');
function execute() {
    return Response.success([
        {title: "Truyện hot", input: BASE_URL + "/danh-sach/truyen-hot/", script: "homecontent.js"},
        {title: "Truyện full", input: BASE_URL + "/danh-sach/truyen-full/", script: "homecontent.js"}
    ]);
}