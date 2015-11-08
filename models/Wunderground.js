"use strict";

var http = require('request-promise')

class Wunderground {
  constructor(config) {
    this.config = config
    this.key = config.key
  }

  get(features) {
    features = typeof features == 'string' ? [features] : features
    var url = 'http://api.wunderground.com/api/'+this.key+'/',
       format = this.config.location+'.json';

    for (var i = 0; i < features.length; i++) {
     url += features[i]+'/'
    };

    url += 'q/'+format

    return http({
      url: url,
      json: true
    })
  }
}

module.exports = Wunderground