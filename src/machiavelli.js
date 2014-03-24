cubism_contextPrototype.machiavelli= function(host) {
  if (!arguments.length) host = "";
  var source = {},
      context = this;

  source.metric = function(target) {

    var metric = context.metric(function(start, stop, step, callback) {

	feed = host + "/metric/?metric="
	      + target
	      + "&start=" + cubism_machiavelliFormatDate(start - 2 * step)
	      + "&end=" + cubism_machiavelliFormatDate(stop - 1000)
	      + "&step="+ step/1000
	d3.json(feed
          , function(data) {
          if (!data) return callback(new Error("unable to load data"));
          callback(null, data.map(function(d) { return d.y} ))
      });
    }, target += "");
    return metric;
  };

  source.toString = function() {
    return host;
  };

  return source;
};

function cubism_machiavelliFormatDate(time) {                                                                                                                                        
  return Math.floor(time / 1000);
}
