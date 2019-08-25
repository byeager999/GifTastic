$(document).ready(function () {

  var animals = ["dog", "cat", "bunny"];

  var queryURL = "https://api.giphy.com/v1/?" + animal + "&api_key=XMgsyApvzodfXII91w9pzzqX9RNA9vYG"

// function to add the buttons to the screen
  function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("animal");
      a.attr("data-name", animals[i]);
      a.text(animals[i]);
      $("#buttons").append(a);
    }

  };


  // function to add the animals to the array
  $("#animalButton").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animalInput").val().trim();
    animals.push(animal);
    console.log(animals);

    renderButtons();
  });

  renderButtons();

  var animal = $(this).attr("data-name");
// function to display the animal gifs upon click of the specific animal button
  $("button").on("click", function () {

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++){
          console.log(results);
          var gifDiv = $("<div>");

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");

          animalImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.append(p);
          gifDiv.append(animalImage);
          
          // display gifs in results div    
          $("#results").prepend(gifDiv);
        }




      })
  })


  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }


});


// when rendering to the page will have to create buttons in the jQuery function
// i.e. $("#buttons").html("<submit> something, something, something...")