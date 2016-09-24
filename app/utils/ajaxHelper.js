import ENV from '../config/environment';
import Ember from 'ember';

var ajaxHelper = {
    makeRequest: function(url, data, type, header = { 'Accept': 'application/json' }) {
        const options = {
            url,
            data,
            type,
            dataType: 'json',
            headers: header
        };
        return Ember.$.ajax(options);
    },

    getCurrentLocation: function(callbackFunction) {
        var endpoint = "http://ip-api.com/json";
        var type = "GET";
        this.makeRequest(endpoint, null, type).then((response) => {
            callbackFunction.call(this, response);
        }, (error) => {
            callbackFunction.call(this, error);
        });
    },


};

export default ajaxHelper;