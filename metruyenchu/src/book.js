load("config.js");
function execute(url, page) {
    if (!page) page = '1';
    let tocUrl = BASE_URL2.replace("https://", "https://backend.") + url + "&limit=20&page=" + page;

    let response = fetch(tocUrl, {
        headers: {
            "X-App": "MeTruyenChu"
        },
    });

    if (response.ok) {
        var json = response.json();
        var novelList = [];
        var next = "";
        if (json.pagination && json.pagination.next)
            next = json.pagination.next + "";

        for (var i = 0; i < json.data.length; i++) {
            var book = json.data[i];
            var authorName = "Không rõ tác giả";
            if (book.author && book.author.name)
                authorName = book.author.name;

            var coverUrl = "";
            if (book.poster && book.poster["default"])
                coverUrl = book.poster["default"];

            novelList.push({
                name: book.name,
                link: book.link,
                description: authorName,
                cover: coverUrl,
                host: BASE_URL
            });
        }

        return Response.success(novelList, next);
    }

    console.log("Lỗi HTTP:", response.status);
    return null;
}
