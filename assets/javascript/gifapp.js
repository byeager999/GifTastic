$(document).ready(function () {

  var animals = ["dog", "cat", "bunny", "cow"];


  // function to add the buttons to the screen
  function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("data-animal");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#buttons").append(a);
    }

  };


  // function to add the animals to the array
  $("#animalButton").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animalInput").val().trim();
    if (!animal == " ") {
      animals.push(animal);
      console.log(animals);
    }


    renderButtons();
  });

  renderButtons();

  var animal = $(this).attr("data-animal");


  // function to display the animal gifs upon click of the specific animal button
  
  $("#buttons").on("click", "button", function () {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=XMgsyApvzodfXII91w9pzzqX9RNA9vYG"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class='gifResults'>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var animalImage = $("<img>");

        animalImage.attr("class", "gif");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        // display gifs in results div    
        $("#results").prepend(animalDiv);
      }

    })
    
    })
  })
  $(document).on("click", ".gif", function(){
    
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log("gif clicked state= " + state);
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


