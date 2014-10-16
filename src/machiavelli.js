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
          if (!data || data.length == 0) return callback(machiavelli_error(target,"error loading data - no data returned"));
          if (data.error) return callback(machiavelli_error(target,data.error));
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

function machiavelli_error(target,msg) {
        var t = $.grep(chart.metric, function(i,d){ return i.id == target})[0].title //this wont work outside clizia
        $("span:contains('"+t+"')").filter(".title").append(" -- "+msg);
	if (typeof chart == "object") { chart.metric_failed() }
	return  new Error(msg);
}
