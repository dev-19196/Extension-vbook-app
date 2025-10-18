load("config.js");

function execute(url, page) {
    if (!page) page = '1';
    let tocUrl = BASE_URL2.replace("https://", "https://backend.") + url + "&limit=20&page=" + page;

    let response = Http.get(tocUrl, {
        headers: {
            "X-App": "MeTruyenChu"
        }
    });

    if (response.code === 200) {
        let json = JSON.parse(response.text());
        let novelList = [];
        let next = json.pagination.next ? json.pagination.next + "" : null;

        json.data.forEach(book => {
            novelList.push({
                name: book.name,
                link: book.link,
                description: book.author?.name || "",
                cover: book.poster?.["default"] || "",
                host: BASE_URL
            });
        });

        return Response.success(novelList, next);
    }

    return null;
}
