
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
            hero.attr("data-name", superHeroes[i]);
            hero.text(superHeroes[i]);
            $("#buttons-view").append(hero);
        }
    }
    // This function handles events where one button is clicked
    $("#add-superhero").on("click", function (event) {
        event.preventDefault();
        var hero = $("#button-input").val().trim();
        superHeroes.push(hero);
        renderButtons();
    })

});
