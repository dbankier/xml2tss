var fs = require('fs'),
    xml2js = require('xml2js');
 
function parse(o) {
  var buffer = [];
  function process(internal_object) {
    for(key in internal_object) {
      value = internal_object[key];
      if (key ==="$") {
        if (value.id) {
          buffer.push("#" + value.id);
        }
        if (value.class) {
          buffer = buffer.concat(value.class.split(" ").map(function(o) { return "." + o;}));
        }
      } else if (key !== "_") {
        buffer = buffer.concat(parse(value));
      }
    }
  }
  if (o instanceof Array) {
    o.forEach(function(i) {
      process(i);
    });
  } else {
    process(o);
  }
  return buffer;
}
    
exports.convertString=function(string, callback) {
  var parser = new xml2js.Parser();
  parser.parseString(string, function(err,data) {
    var raw = parse(data);
    callback(err, raw
       .filter(function(elem, pos) {
          return raw.indexOf(elem) === pos;
       })
       .sort()
       .map(function(e) {
         return '"'+e+'" : {\n  \n}';
       }).join('\n')
    );
  });
};

exports.convertFile=function(file,callback) {
  fs.readFile(file, function(err, data) {
    exports.convertString(data,callback);
  });
}
