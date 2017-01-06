describe('omdb service', function(){
    var expectedMovieData = {"Search":[{"Title":"Who Is Harry Nilsson (And Why Is Everybody Talkin' About Him?)","Year":"2010","imdbID":"tt0756727","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2NTI5NDY2Ml5BMl5BanBnXkFtZTcwODQzMDMzNA@@._V1_SX300.jpg"},{"Title":"Bonehead in 'Why Do You Think They Call Him Dope'","Year":"1990","imdbID":"tt3733440","Type":"movie","Poster":"N/A"},{"Title":"Why Him?","Year":"2016","imdbID":"tt4501244","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTEzOTM0MDg5MDNeQTJeQWpwZ15BbWU4MDE0MjYxMzkx._V1_SX300.jpg"}],"totalResults":"3","Response":"True"};

    var expectedMovieById = {"Title":"Why Him?","Year":"2016","Rated":"R","Released":"23 Dec 2016","Runtime":"111 min","Genre":"Comedy","Director":"John Hamburg","Writer":"Jonah Hill (story), John Hamburg (story), Ian Helfer (story), John Hamburg (screenplay), Ian Helfer (screenplay)","Actors":"Zoey Deutch, James Franco, Bryan Cranston, Megan Mullally","Plot":"A dad forms a bitter rivalry with his daughter's young rich boyfriend.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTEzOTM0MDg5MDNeQTJeQWpwZ15BbWU4MDE0MjYxMzkx._V1_SX300.jpg","Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt4501244","Type":"movie","Response":"True"};

    var omdbApi = {};
    var $httpBackend;

    beforeEach(module('omdb'));

    beforeEach(inject(function(_omdbApi_, _$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    //http://omdbapi.com/
    
    it('should return search data', function(){
        var responsedMovieData;
        var expectedUrl = 'http://www.omdbapi.com/?v=1&s=why%20him';
        // var expectedUrl = function(){
        //     return url.indexOf('http://www.omdbapi.com/?t=1&s=why%20him') != -1;
        // }

        $httpBackend.when('GET', expectedUrl)
            .respond(200, expectedMovieData);

        omdbApi.search('why him')
            .then(function(data){
                responsedMovieData = data;
            });
        $httpBackend.flush();

        expect(responsedMovieData).toEqual(expectedMovieData);
    })

    it('should return movie data by id', function(){
        var responsedMovieData;
        var expectedUrl = 'http://www.omdbapi.com/?v=1&i=tt4501244';

        $httpBackend.expect('GET', expectedUrl)
            .respond(200, expectedMovieById);

        omdbApi.find('tt4501244')
            .then(function(data){
                responsedMovieData = data;
            });

        $httpBackend.flush();

        expect(responsedMovieData).toEqual(expectedMovieById);
    })

    it('should handle error', function(){
        var responsedMovieData;
         var expectedUrl = 'http://www.omdbapi.com/?v=1&i=tt4501244';

        $httpBackend.expect('GET', expectedUrl)
            .respond(500);

        omdbApi.find('tt4501244')
            .then(function(data){
                responsedMovieData = data;
            })
            .catch(function(){
                responsedMovieData = 'Error!';
            });
        $httpBackend.flush();

        expect(responsedMovieData).toBe('Error!');
    })


})