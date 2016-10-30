var twitchModule = (function() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  classification(users);

  function classification( arr ){
    arr.forEach(function( item ) {
      $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + item + '?callback=?', function(data) {
        var code="";
        if ( data.stream === null ) {
            profile(item, data.stream, function( add ){
                 code="<div id='" + item + "' class='inactive'><a href='#"+ item + "'>" + item + "</a>" + add + "</div>";

                console.log( add );
                $("#content").append(code);
            });

        } else if ( data.stream === undefined ) {
             code="<div id='"+ item + "' class='dead'><p>Unfortunately <strong>" + item + "</strong> has deleted their account</p></div>";
            $("#content").append(code);
        }
        else {
            profile(item, data.stream, function( add ){
              var url = data.stream.channel.url;
                code = "<div id='" + item + "' class='active'><a href='" + url + "' target='_blank'>" + item + "</a>" + add + "</div>";

                console.log( add );
                $("#content").append( code );
              });
        }
      });

      });
    }

  function profile(val, ifActive, callback) {
    var code="";
    var pic = "";
    $.getJSON("https://wind-bow.hyperdev.space/twitch-api/channels/" + val + "?callback=?", function (data){
      if( ifActive ) {
        pic = data.logo;
        var game = data.game;
        code="<span class='pic'><img src='" + pic + "'></span><span class='status'>online</span><span class='game'>" + game + "</span>";
        if(typeof callback == 'function') {
            callback(code);
        }
      } else if( ifActive === null ) {
        pic = data.logo;
        code="<span class='pic'><img src='" + pic + "'></span><span class='status'>offline</span>";
        if(typeof callback == 'function') {
            callback(code);
        }
      }
    });
  }
})();
