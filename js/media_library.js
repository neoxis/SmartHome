function searchMovieDatabase(term) {
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
						html += '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '"></img>';
					}
				}
				$('.movie_catalog').empty();
				$('.movie_catalog').html(html);
				console.log(data);
			},
			error: function(e) {
				console.log(e);
			}
		});
	});
}