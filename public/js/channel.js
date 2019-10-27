$(document).ready(function () {
    var sourceID = $("#source-id").attr("data-id");
    var channelArticles = $("#channel-articles");
    var userToken = $("#user-token").attr("data-token");
    var currCommentArticleID;

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
        $("#channel-articles").empty();
        // Render article partials
        articles.forEach(function (article) {
            var articlePartial = Handlebars.templates.article(article);
            channelArticles.append(articlePartial);
        });
        markArticles();
    }

    function loadArticles(cb) {
        let pageID = getPageId();

        // Make ajax request
        $.get(`/api/${sourceID}/${pageID}/articles`, function (articles) {
            // Call callback
            cb();
            // Render articles
            if (articles.length) {
                renderArticles(articles);
            }
        })
    }

    $("#page-selection").change(function () {
        $("#sync-articles-btn").click();
    })

    $("#sync-articles-btn").click(function () {
        let pageID = getPageId();
        $(this).addClass("fa-spin");
        $.get(`/api/scrape/${sourceID}/${pageID}`, function () {
            loadArticles(function () {
                $("#sync-articles-btn").removeClass("fa-spin");
            });
        })
    })

    function getPageId() {
        return $("#page-selection").find('option:selected').attr("data-id");
    }

    // Viewing Likes
    $(document).on("click", ".like-btn p", function () {
        let btnDiv = $(this).parent();
        let articleID = btnDiv.attr("data-id");

        $.get(`/api/articles/${articleID}/likes`, function (likes) {
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

        })
    })

    // Viewing comments
    $(document).on("click", ".comment-btn", function () {
        let btnDiv = $(this);
        let articleID = btnDiv.attr("data-id");
        currCommentArticleID = articleID;

        $.get(`/api/articles/${articleID}/comments`, function (comments) {
            var commentsView = Handlebars.templates.commentsView({
                comments: comments
            })
            bootbox.dialog({
                message: commentsView,
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
    $(document).on('keypress', "#comment-input", function (e) {
        if (e.which === 13) {
            var comment = {};
            var content = $(this).val().trim();
            comment.content = content;

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            // Submit comment and then load comments

            $.ajax({
                url: `/api/articles/${currCommentArticleID}/comments`,
                type: "POST",
                data: {
                    comment: comment,
                    userID: userToken
                },
                success: function () {
                    $.get(`/api/articles/${currCommentArticleID}/comments`, function (comments) {
                        $("#comment-input").val("");
                        var commentList = $(".commentsList")
                        commentList.empty();
                        comments.forEach(function(comment){
                            var commentPartial = Handlebars.templates.comment(comment);
                            commentList.append(commentPartial);
                        })
                        commentList.scrollTop(1E10);

        
                    });
        
                    //Enable the textbox again if needed.
                    $("#comment-input").removeAttr("disabled");
                    $("#sync-articles-btn").click();

                }
            })


        }
    });

    // Add/Remove a bookmark
    $(document).on("click", ".bookmark-btn", function () {
        let btnDiv = $(this);
        let btn = btnDiv.find("i");
        let text = btnDiv.find("p")
        let articleID = btnDiv.attr("data-id");
        let isSaved = btnDiv.attr("data-saved");

        if (isSaved == "false") {
            // Create a bookmark
            $.ajax({
                url: `/api/favorites/${userToken}`,
                type: "POST",
                data: {
                    articleID: articleID
                },
                success: function () {
                    btn.addClass("fas");
                    btn.removeClass("far");
                    text.text("saved");
                    btnDiv.attr("data-saved", "true");
                }
            })
        } else {
            // Remove a bookmark
            $.ajax({
                url: `/api/favorites/${userToken}`,
                type: "DELETE",
                data: {
                    articleID: articleID
                },
                success: function () {
                    btn.addClass("far");
                    btn.removeClass("fas");
                    text.text("save");
                    btnDiv.attr("data-saved", "false");

                }
            })
        }
    })


    // Load the first page option
    $("#sync-articles-btn").click();
})