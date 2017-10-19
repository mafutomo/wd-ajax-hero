(function() {
  'use strict';

  var movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

//MY CODE BELOW

  $('button').on("click", function() {
    movies = [];
    event.preventDefault()
    let input = $('#search').val()
    if(input === "") {
      alert("Please submit a movie title.");
      return;
    }

    let linkExt = input.split(" ").join("+")
    let link = "https://omdb-api.now.sh/?s="

        let $xhr = $.getJSON(link+linkExt);

        $xhr.done(function(data) {
          if ($xhr.status !== 200) {
            return;
          }
          console.log("data = ", data);

          let movieResult = {};

          for (var i = 0; i < data.Search.length; i++) {
            movieResult = {
            "id" : data.Search[i].imdbID,
            "poster" : data.Search[i].Poster,
            "title" : data.Search[i].Title,
            "year" : data.Search[i].Year
            }
            movies.push(movieResult)
          }

          console.log("movies = ", movies);
          renderMovies()




        })//end of done

    }); //end of event listener






})(); //DO NOT TOUCH THIS!
