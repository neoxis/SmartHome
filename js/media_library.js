function searchMovieDatabase() {
	if ($('#tmdb_search_val').val() == '' || $('#tmdb_search_val').val().length == 0) {
		$('.movie_catalog').empty();
		return;
	}
	try {
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
							if(movie.title) { html += '<h3>' + movie.title + '</h3>'; }
							else if(movie.name) { html += '<h3>' + movie.name + '</h3>'; }
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
	catch(err) {
		console.log(err);
		$('.movie_catalog').empty();
	}
}

function getGenreFromId(genre_id) {
	switch(genre_id) {
		case 12:    return 'Adventure';
		case 14:    return 'Fantasy';
		case 16:    return 'Animation';
		case 18:    return 'Drama';
		case 27:    return 'Horror';
		case 28:    return 'Action';
		case 35:    return 'Comedy';
		case 36:    return 'History';
		case 37:    return 'Western';
		case 53:    return 'Thriller';
		case 80:    return 'Crime';
		case 99:    return 'Documentary';
		case 878:   return 'Science Fiction';
		case 9648:  return 'Mystery';
		case 10402: return 'Music';
		case 10749: return 'Romance';
		case 10751: return 'Family';
		case 10752: return 'War';
		case 10759: return 'Action & Adventure';
		case 10762: return 'Kids';
		case 10763: return 'News';
		case 10764: return 'Reality';
		case 10765: return 'Sci-Fi & Fantasy';
		case 10766: return 'Soap';
		case 10767: return 'Talk';
		case 10768: return 'War & Politics';
		case 10770: return 'TV Movie';
		default:    console.log(genre_id);
	}
}

function displaySearchBar(obj) {
	//need to find a better way to toggle hover color
	$(obj).toggleClass('yellow');
	
	$('#tmdb_search_val').val("");
	$('.searchbar').toggle();
	$('#tmdb_search_val').focus();
	$('.movie_catalog').empty();
}