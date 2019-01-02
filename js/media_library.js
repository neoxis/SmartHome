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
						html += '<div class="movie_info">' + movie.overview + '</div>';
						html += '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '"></img>';
						//html += '<p align="center">' + movie.title + '</p>';
						html += '</div>';
					}
				}
				$('.movie_catalog').empty();
				$('.movie_catalog').html(html);
				$('.movie_container').hover(
					function () {
						//$(this).addClass('overlay');
						$(this).find('img').addClass('fade_image');
						$(this).find('.movie_info').show();
					},
					function () {
						//$(this).removeClass('overlay');
						$(this).find('img').removeClass('fade_image');
						$(this).find('.movie_info').hide();
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