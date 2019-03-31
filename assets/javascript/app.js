
$(document).ready(function () {
    // Initial array of super heroes
    var superHeroes = ["X-Men", "Avengers","Justice League", "Iron Man", "Spiderman", "Superman", "Batman", "Incredible Hulk", "Aquaman"];
    
    // Calling the renderButtons function at least once to display the initial list of super heroes
    renderButtons();

    // Function for displaying buttons
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < superHeroes.length; i++) {
            var hero = $("<button>");
            $(hero).attr('id', 'hero-button');
            hero.addClass("hero");
            $(hero).attr('type', 'submit');
            hero.attr("data-name", superHeroes[i]);
            hero.text(superHeroes[i]);
            $("#buttons-view").append(hero);
        }
    }

    // Function to add hero buttons
    $("#add-superhero").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // This line will grab the text from the input box
        var hero = $("#button-input").val().trim();
        // The super hero from the textbox is then added to our array
        superHeroes.push(hero);
        //Call renderButtons function
        renderButtons();
        // Clear the form field
        $("form").trigger("reset");
    })

    //Function queries GIPHY for super hero button selected
    $("button").on("click", function (event) {
        event.preventDefault();
        // Storing our giphy API URL
        var heroName = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + heroName + "&api_key=xpKl0hsLaTcPGpvdzolHfqbGD2PgBpqW&limit=1";
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                // Storing an array of the response data
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r") {
                        var gifDiv = $("<div>");
                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        // Creating an image tag
                        var heroImage = $("<img>");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        heroImage.attr("src", results[i].images.fixed_height.url);
                        // Appending the paragraph and heroImage we created to the "gifDiv" div
                        gifDiv.append(p);
                        gifDiv.append(heroImage);
                        // Prepending the gifDiv to the "#images" div in the HTML
                        $("#images").prepend(gifDiv);
                        $("#images").prepend(heroImage);
                    }
                }
            });
    });
});
