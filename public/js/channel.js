$(document).ready(function(){
    var sourceID = $("#source-id").attr("data-id");
    var channelArticles = $("#channel-articles");
    
    function renderArticles(articles) {
        // Clear articles
        $("#channel-articles").empty();
        // Render article partials
        articles.forEach(function(article){
            var articlePartial = Handlebars.templates.article(article);
            channelArticles.append(articlePartial);
        })
    }

    function loadArticles(pageID, cb) {
        
        // Make ajax request
        $.get(`/api/articles/${sourceID}/${pageID}`, function(articles){
            // Call callback
            cb();
            // Render articles
            renderArticles(articles);
        })
    }

    $("#page-selection").change(function(){
        loadArticles($(this).attr("data-id"), ()=>{});
    })

    $("#sync-articles-btn").click(function(){
        $(this).addClass("fa-spin");
        $.get(`/api/scrape/${sourceID}/${pageID}`, function(){
            loadArticles(pageID, function(){
                $("#sync-articles-btn").removeClass("fa-spin");
            });
        })
    })
})
