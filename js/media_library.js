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
				for(var i = 0; i < data.results.length; i++) {
					movie = data.results[i];
					if(movie.poster_path) {
						html += '<div class="movie_container">';
						if(movie.backdrop_path) {
							html += '<input type="hidden" name="backdrop-image" value="' + movie.backdrop_path + '">';
						}
						else {
							html += '<input type="hidden" id="backdrop-image" value="">';
						}
						html += '<div class="movie_info">';
						html += movie.overview;
						html += '<div class="movie_options">';
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

function displaySearchBar(obj) {
	//need to find a better way to toggle hover color
	$(obj).toggleClass('yellow');
	
	$('#tmdb_search_val').val("");
	$('.searchbar').toggle();
	$('.movie_catalog').empty();
}