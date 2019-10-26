$(document).ready(function () {

    $(".show-overlay-btn").click(function () {
        // Populate channel selection with icons
        $.get("/api/icons", function (icons) {
            $("#channel-icons").empty();
            icons.forEach(function (icon) {
                var iconPartial = Handlebars.templates.channelIcon(icon);
                $("#channel-icons").append(iconPartial);
            })
            $("#channel-overlay").fadeIn();
        })

    })

    $(document).on("click", ".close-overlay-btn", function () {
        $("#channel-overlay").fadeOut();
    })


})
