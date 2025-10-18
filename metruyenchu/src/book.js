load("config.js");

function execute(url, page) {
    if (!page) page = '1';
    var tocUrl = "https://backend.metruyencv.com" + url + "&limit=20&page=" + page;

    var response = fetch(tocUrl, {
        headers: {
            "X-App": "MeTruyenChu",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; Mobile) Chrome/119.0.0.0 Safari/537.36"
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
