
$(document).ready(function () {

    // Array of super heroes
    var superHeroes = ["X-Men", "Avengers", "Justice League", "Iron Man", "Spiderman", "Superman", "Batman", "Incredible Hulk", "Aquaman"];

    // Calling the renderButtons function at least once to display the initial list of super heroes
    renderButtons();

    // Function for displaying buttons
    function renderButtons() {
        // Prevent repeat buttons
        $("#buttons-view").empty();
        // Loop through superHeroes array
        for (var i = 0; i < superHeroes.length; i++) {
            // Assign variable to create <button> tag
            var hero = $("<button>");
            // Add attributes and classes
            $(hero).attr("id", "hero-button");
            hero.addClass("hero collection-item waves-effect green btn-medium");
            $(hero).attr("type", "submit");
            hero.attr("data-name", superHeroes[i]);
            hero.text(superHeroes[i]);
            // Add buttons to HTML
            $("#buttons-view").append(hero);
        }
    }

    // On click Function to add hero buttons
    $("#add-superhero").click(function () {
        // Grabs valus from the text box
        var txtBox = $("#button-input").val();
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // Do nothing if txtBox empty and focus on the input field
        if (txtBox === "") {
            $("#button-input").focus();
            // Else execute code if txtBox has data
        } else {
            // This line will grab the text from the input box
            var addHero = $("#button-input").val().trim();
            // The super hero from the textbox is then added to our array
            superHeroes.push(addHero);
            // Call renderButtons function
            renderButtons();
            // Clear the form field
            $("#button-input").val(" ");
        }
        //Prevent submit button from refreshing page.
        return false;
    });


    // On click Function queries GIPHY for super hero button selected
    // $("button#hero-button").click(function() {
    $(document).on('click', 'button#hero-button', function () {
        // Storing our giphy API URL
        var heroName = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + heroName + "&api_key=xpKl0hsLaTcPGpvdzolHfqbGD2PgBpqW&random&limit=10";
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
                        var p = $("<p>").text("Rating: " + rating.toUpperCase());
                        // Creating an image tag
                        var heroImage = $("<img>");
                        // Giving the image tag a src attribute for still image
                        heroImage.attr("src", results[i].images.fixed_height_still.url);
                        // Giving the image tag a gif class
                        heroImage.attr("class", "gif");
                        // Giving the image tag a data-still attribute for the still image URL
                        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                        // Giving the image tag a data-animate atribute for animated GIF
                        heroImage.attr("data-animate", results[i].images.fixed_height.url);
                        // Giving the image tag an initial data-state tag of still
                        heroImage.attr("data-state", "still");
                        // Appending the paragraph and heroImage we created to the "gifDiv" div
                        gifDiv.append(p);
                        gifDiv.append(heroImage);
                        // Prepending the gifDiv to the "#images" div
                        $("#images").prepend(gifDiv);
                        // Prepending heroImage to the "#images" div
                        $("#images").prepend(heroImage);
                    }
                }
            });

    });

    //On click Function for playing/pausing 
    $(document).on('click', '.gif', function () {
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            // Then, set the image's data-state to animate
            $(this).attr("data-state", "animate");
        } else {
            // Else set src to the data-still value
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});


