function searchMovieDatabase() {
	$.getJSON('/php/database_queries/settings_queries.php', { 'function':'getTMDBapiKey' }, function(e) {
		$.ajax({
			url: 'https://api.themoviedb.org/3/search/movie',
			crossDomain: true,
			dataType: 'jsonp',
			data: {
				api_key: e.api_key,
				query: $('#tmdb_search_val').val()
			},
			method: 'GET',
			success: function(data) {
				//display here
				html = '';
				for(i = 0; i < data.results.length; i++) {
					movie = data.results[i];
					if(movie.poster_path) {
						html += '<div class="movie_container">';
						if(movie.backdrop_path) {
							html += '<input type="hidden" name="backdrop-image" value="' + movie.backdrop_path + '">';
						}
						else {
							html += '<input type="hidden" name="backdrop-image" value="">';
						}
						html += '<div class="movie_info">';
						html += movie.title;
						html += movie.release_date.split('-')[0];
						for(j = 0; j < movie.genre_ids.length; j++) {
							html += getGenreFromId(movie.genre_ids[j]);
						}
						html += '<div class="movie_options">';
						html += '<button>View Details</button>';
						html += '<button>Add To Catalog</button>';
						html += '</div>';
						html += '</div>';
						html += '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '"></img>';
						//html += '<p align="center">' + movie.title + '</p>';
						html += '</div>';
					}
				}
				$('.movie_catalog').empty();
				$('.movie_catalog').html(html);
				$('.movie_container').hover(
					function () {
						$(this).find('img').addClass('fade_image');
						$(this).find('.movie_info').show();
						if($(this).find('input[name=backdrop-image]').val() != "") {
							$('body').css('background-image', 'url(https://image.tmdb.org/t/p/w500' + $(this).find('input[name=backdrop-image]').val() + ')');
						}
					},
					function () {
						$(this).find('img').removeClass('fade_image');
						$(this).find('.movie_info').hide();
						$('body').css('background-image', '');
					}
					);
				console.log(data);
			},
			error: function(e) {
				console.log(e);
			}
		});
	});
}

function getGenreFromId(genre_id) {
	if     (genre_id == 12)    { return 'Adventure'; }
	else if(genre_id == 14)    { return 'Fantasy'; }
	else if(genre_id == 16)    { return 'Animation'; }
	else if(genre_id == 18)    { return 'Drama'; }
	else if(genre_id == 27)    { return 'Horror'; }
	else if(genre_id == 28)    { return 'Action'; }
	else if(genre_id == 35)    { return 'Comedy'; }
	else if(genre_id == 36)    { return 'History'; }
	else if(genre_id == 37)    { return 'Western'; }
	else if(genre_id == 53)    { return 'Thiller'; }
	else if(genre_id == 80)    { return 'Crime'; }
	else if(genre_id == 99)    { return 'Documentary'; }
	else if(genre_id == 878)   { return 'Science Fiction'; }
	else if(genre_id == 9648)  { return 'Mystery'; }
	else if(genre_id == 10402) { return 'Music'; }
	else if(genre_id == 10749) { return 'Romance'; }
	else if(genre_id == 10751) { return 'Family'; }
	else if(genre_id == 10752) { return 'War'; }
	else if(genre_id == 10770) { return 'TV Movie'; }
	else { console.log(genre_id); }
}

function displaySearchBar(obj) {
	//need to find a better way to toggle hover color
	$(obj).toggleClass('yellow');
	
	$('#tmdb_search_val').val("");
	$('.searchbar').toggle();
	$('.movie_catalog').empty();
}