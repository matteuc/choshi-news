    const loadProfilePic = path => {
        $("#profile-img").attr("src", path);
    }
    
    $(document).on("click", "[data-link]", function() {
        window.location.href = $(this).attr("data-link");
        return false;
      });

      