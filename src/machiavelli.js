cubism_contextPrototype.machiavelli= function(host) {
  if (!arguments.length) host = "";
  var source = {},
      context = this;

  source.metric = function(target, metricName, postEffect) {
    postEffect = postEffect || function(){};
    metricName = metricName || target
    var metric = context.metric(function(start, stop, step, callback) {
	feed = host + "/metric/?metric="
	      + target
	      + "&start=" + cubism_machiavelliFormatDate(start - 2 * step)
	      + "&stop=" + cubism_machiavelliFormatDate(stop - 1000)
	      + "&step="+ step/1000
	d3.json(feed
          , function(data) {
          if (!data || data.length == 0) return callback(new Error("error loading data - no data returned"));
          if (data.error) return callback(new Error("machiavelli error: "+data.error));
          callback(postEffect(), data.map(function(d) { return d.y} ))
      });
    }, metricName);
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
