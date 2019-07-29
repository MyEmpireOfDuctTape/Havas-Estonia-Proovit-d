var data = "{}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

var name;

function movie() {
    document.getElementById("frmSearch").onsubmit = function () {

        if (document.getElementById("name").value == "") {
            document.getElementById("errorMessage").innerHTML = "Please provide at least one word from the movie title";
            return false;
        } else {
            document.getElementById("errorMessage").innerHTML = "";
            name = document.getElementById("name").value;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    // console.log(this.responseText);
                    if (this.responseText) {
                        try {
                            var myArr = JSON.parse(this.responseText);
                            showMovie(myArr);
                        } catch (e) {
                            document.getElementById("errorMessage").innerHTML = "Please use only english words";
                            document.getElementById("infoResult").innerHTML = "";
                        }
                    }
                }
            });

            xhr.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + name + "&language=en-US&api_key=0d91210fa5f76e59a448f9756e81d919");
            xhr.send(data);
            return false;
        }
    };
}

function showMovie(arr) {
    var out = "";
    var i;
    for (i = 0; i < 3; i++) {
        out += '<h4>' + arr.results[i].title + '</h4><p class="text-muted">Vote average ' + arr.results[i].vote_average + '</p><p>' + arr.results[i].overview + '</p><br>';
    }
    document.getElementById("infoResult").innerHTML = out;
}


window.onload = function () {
    movie();
}