$(document).ready(function () {
    var numArticles = 0;
    var savedArticles = $("#saved-articles");
    var userToken = $("#user-token").attr("data-token");

    function markArticles() {
        $.get(`/api/profile/${userToken}`, function (userData) {
            // Mark favorites
            userData.favorites.forEach(function (favArticleID) {
                var btnDiv = $(`.bookmark-btn[data-id="${favArticleID}"]`);
                var btn = btnDiv.find("i");
                var text = btnDiv.find("p");
                btn.addClass("fas");
                btn.removeClass("far");
                text.text("saved");
                btnDiv.attr("data-saved", "true");
            })

            // Mark likes
            userData.likes.forEach(function (likeInfo) {
                var btnDiv = $(`.like-btn[data-id="${likeInfo.article}"]`);
                var btn = btnDiv.find("i");
                btnDiv.attr("data-likeid", likeInfo._id);
                btn.addClass("fas");
                btn.removeClass("far");
                btnDiv.attr("data-liked", "true");
            })
        });
    }

    function renderArticles(articles) {
        // Clear articles
        savedArticles.empty();
        // Render article partials
        articles.forEach(function (article) {
            var articlePartial = Handlebars.templates.article(article);
            savedArticles.append(articlePartial);
        });
        markArticles();
    }

    function loadArticles(cb) {
        // Make ajax request
        $.get(`/api/favorites/${userToken}`, function (articles) {
            // Call callback
            if (cb) {
                cb();
            }
            // Render articles
            if (articles.length) {
                numArticles = articles.length;
                if (numArticles > 2) {
                    $("#saved-articles").css("height", "auto");
                }
                renderArticles(articles);
            }
        })
    }



    // Viewing Likes
    $(document).on("click", ".like-btn p", function () {
        let btnDiv = $(this).parent();
        let articleID = btnDiv.attr("data-id");

        $.get(`/api/articles/${articleID}/likes`, function (likes) {
            if (likes.length) {
                var likesList = Handlebars.templates.likesView({
                    likes: likes
                })
                bootbox.dialog({
                    message: likesList,
                    centerVertical: true,
                    closeButton: false,
                    size: 'lg',
                    buttons: [{
                        label: "Cancel",
                        className: "btn btn-secondary",
                        callback: function () {}
                    }],
                    onEscape: true,
                    backdrop: true
                })
            }
        })
    })

    // Liking/Unliking an article
    $(document).on("click", ".like-btn i", function () {
        let btnDiv = $(this).parent();
        let btn = btnDiv.find("i");
        let text = btnDiv.find("p");
        let num = parseInt(text.attr("data-likes"));
        let articleID = btnDiv.attr("data-id");
        let isLiked = btnDiv.attr("data-liked");

        if (isLiked == "false") {
            // Add a like
            $.ajax({
                url: `/api/articles/${articleID}/likes`,
                type: "POST",
                data: {
                    articleID: articleID,
                    userID: userToken
                },
                success: function (data) {
                    btnDiv.attr("data-likeid", data.id);
                    btn.addClass("fas");
                    btn.removeClass("far");
                    text.text(`${num + 1} upvotes`);
                    text.attr("data-likes", num + 1)
                    btnDiv.attr("data-liked", "true");
                },
                dataType: "json"
            })
        } else {
            // Remove a like
            let likeID = btnDiv.attr("data-likeid");
            $.ajax({
                url: `/api/articles/${articleID}/likes`,
                type: "DELETE",
                data: {
                    articleID: articleID,
                    userID: userToken,
                    likeID: likeID
                },
                success: function () {
                    btn.addClass("far");
                    btn.removeClass("fas");
                    text.text(`${num - 1} upvotes`);
                    text.attr("data-likes", num - 1)
                    btnDiv.attr("data-liked", "false");

                }
            })
        }
    })

    // Adding a comment

    // Add/Remove a bookmark
    $(document).on("click", ".bookmark-btn", function () {
        let btnDiv = $(this);
        let btn = btnDiv.find("i");
        let text = btnDiv.find("p");
        let articleID = btnDiv.attr("data-id");

        // Remove a bookmark
        $.ajax({
            url: `/api/favorites/${userToken}`,
            type: "DELETE",
            data: {
                articleID: articleID
            },
            success: function () {
                //    Remove bookmarked article from page
                numArticles--;
                if (numArticles <= 2) {
                    $("#saved-articles").css("height", "100vh");
                }
                btn.addClass("far");
                btn.removeClass("fas");
                text.text("save");
                $(`.article-card[data-id="${articleID}"]`).remove();

            }
        })

    })


    // Load the first page option
    loadArticles();
})