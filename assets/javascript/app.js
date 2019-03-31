
$(document).ready(function () {
    // Initial array of super heroes
    var superHeroes = ["Avengers", "X-Men", "Justice League", "Iron Man", "Spiderman", "Superman", "Batman", "Incredible Hulk", "Aquaman"];
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

    // Function for displaying buttons
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < superHeroes.length; i++) {
            var hero = $("<button>");
            hero.addClass("hero");
            $(hero).attr('id', 'hero-button');
            $(hero).attr('type', 'submit');
            hero.attr("data-name", superHeroes[i]);
            hero.text(superHeroes[i]);
            $("#buttons-view").append(hero);
        }
    }
    // Function to add hero buttons
    $("#add-superhero").on("click", function (event) {
        event.preventDefault();
        var hero = $("#button-input").val().trim();
        superHeroes.push(hero);
        renderButtons();
        // Clear the form field
        $("form").trigger("reset");
    })

    //This function queries GIPHY for super hero button selected
    $(".hero").on("click", function (event) {
        console.log('CLICK');
        event.preventDefault();
        // Storing our giphy API URL
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=xpKl0hsLaTcPGpvdzolHfqbGD2PgBpqW&tag=hero";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var imageUrl = response.data.image_original_url;
                var heroImage = $("<img>");
                heroImage.attr("src", imageUrl);
                heroImage.attr("alt", "hero image");
                $("#images").prepend(heroImage);
            });
    });
});
