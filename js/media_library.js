function searchMovieDatabase() {
	if ($('#tmdb_search_val').val() == '') {
		return;
	}
	$.getJSON('/php/database_queries/settings_queries.php', { 'function':'getTMDBapiKey' }, function(e) {
		$.ajax({
			url: 'https://api.themoviedb.org/3/search/multi',
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
						else { html += '<input type="hidden" name="backdrop-image" value="">'; }
						
						html += '<div class="movie_info">';
						if(movie.title) { html += movie.title; }
						else if(movie.name) { html += movie.name; }
						else { html += '-----'; }
						
						html += '<table>';
						
						if(movie.release_date) { 
							html += '<tr><td>Release Date</td><td>';
							temp_rd = movie.release_date.split('-');
							html += temp_rd[1] + '-' + temp_rd[2] + '-' + temp_rd[0];
							html += '</td></tr><tr>';
						}
						else if(movie.first_air_date) {
							html += '<tr><td>First Air Date</td><td>';
							temp_fad = movie.first_air_date.split('-');
							html += temp_fad[1] + '-' + temp_fad[2] + '-' + temp_fad[0];
							html += '</td></tr><tr>';
						}
						else {
							html += '<tr><td>-----</td><td>-----</td></tr>';
						}
						
						if(movie.genre_ids) {
							html += '<tr><td>Genre</td><td>';
							for(j = 0; j < movie.genre_ids.length; j++) {
								html += getGenreFromId(movie.genre_ids[j]);
								if(j < movie.genre_ids.length - 1) {
									html += '<br>';
								}
							}
							html += '</td></tr>';
						}
						
						html += '</table>';
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
	else if(genre_id == 10759) { return 'Action & Adventure'; }
	else if(genre_id == 10762) { return 'Kids'; }
	else if(genre_id == 10763) { return 'News'; }
	else if(genre_id == 10764) { return 'Reality'; }
	else if(genre_id == 10765) { return 'Sci-Fi & Fantasy'; }
	else if(genre_id == 10766) { return 'Soap'; }
	else if(genre_id == 10767) { return 'Talk'; }
	else if(genre_id == 10768) { return 'War & Politics'; }
	else if(genre_id == 10770) { return 'TV Movie'; }
	else { console.log(genre_id); }
}

function displaySearchBar(obj) {
	//need to find a better way to toggle hover color
	$(obj).toggleClass('yellow');
	
	$('#tmdb_search_val').val("");
	$('.searchbar').toggle();
	$('#tmdb_search_val').focus();
	$('.movie_catalog').empty();
}