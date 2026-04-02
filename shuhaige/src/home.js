load('config.js');
function execute() {
    return Response.success([
        {title: "Library", input: BASE_URL + "/shuku/0_0_0_", script: "homecontent.js"},
        {title: "All visit", input: BASE_URL + "/allvisit/", script: "homecontent.js"},
        {title: "All vote", input: BASE_URL + "/allvote/", script: "homecontent.js"}
    ]);
}