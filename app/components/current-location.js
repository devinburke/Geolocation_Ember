import Ember from 'ember';
import ajaxHelper from '../utils/ajaxHelper';

export default Ember.Component.extend({
    locationObject: null,
    locationFound: false,
    showErrorMessage: false,
    wrongFormat: false,
    distanceObjects: [],
    errorMessage: "There was an error finding your location, please try again later",

    init: function() {
        this._super(...arguments);
        var self = this;
        if (localStorage.getItem("currentLocation")) {
            this.set("locationFound", true);
            this.set("locationObject", JSON.parse(localStorage.currentLocation));
        } else {
            ajaxHelper.getCurrentLocation(function(response) {
                "statusText" in response ? (self.set("locationFound", false)) : (self.set("locationFound", true));
                self.get("locationFound") ? null : (self.set("showErrorMessage", true));
                self.get("locationFound") ? (self.set("locationObject", response)) : false;
                if (self.get("locationFound")) {
                    localStorage.currentLocation = JSON.stringify(self.get("locationObject"));
                    console.log(localStorage.currentLocation);
                }
            });
        }
        if (localStorage.getItem("distanceObjects")) {
            this.set("distanceObjects", JSON.parse(localStorage.distanceObjects));
        }
    },

    actions: {
        findNewDistance() {
            if (this.get("longLat")) {
                var longLatPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
                if (longLatPattern.test(this.get('longLat'))) {
                    this.set("wrongFormat", false);
                    this.getNewDistance();
                } else {
                    this.set("wrongFormat", true);
                    this.set("inputError", "Invalid Longitude/Latitude");
                }
            } else {
                this.set("wrongFormat", true);
                this.set("inputError", "Please fill in a Longitude and Latitude");
            }
        },

        removeDistance(id) {
            var arrayId = Ember.$("#list-" + id).index();
            this.get("distanceObjects").removeAt(arrayId);
        }
    },

    latLongChanged: Ember.observer('longLat', function() {
        this.set('longLat', this.get('longLat').replace(/[^0-9,+-\s.]/g, ""));
    }),

    toRadians: function(x) {
        //Decided not to extend Number prototype i.e Number.prototype.toRadians
        return x * Math.PI / 180;
    },

    getNewDistance: function() {
        //Formula Derived from http://www.movable-type.co.uk/scripts/latlong.html
        var splitLongLat = this.get('longLat').split(",");
        var latitudeCurrent = this.get('locationObject').lat;
        var longitudeCurrent = this.get('locationObject').lon;
        var latitudeProjected = splitLongLat[0].trim();
        var longitudeProjected = splitLongLat[1].trim();

        var earthRadius = 6371; // km 
        var latitudeDifference = latitudeProjected - latitudeCurrent;
        var latitudeDistance = this.toRadians(latitudeDifference);
        var longitudeDifference = longitudeProjected - longitudeCurrent;
        var longitudeDistance = this.toRadians(longitudeDifference);
        var a = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
            Math.cos(this.toRadians(latitudeCurrent)) * Math.cos(this.toRadians(latitudeProjected)) *
            Math.sin(longitudeDistance / 2) * Math.sin(longitudeDistance / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = parseInt(earthRadius * c);

        var distanceObject = {
            lat: latitudeProjected,
            lon: longitudeProjected,
            distance: distance,
            id: this.get("distanceObjects").length
        };
        this.get("distanceObjects").pushObject(distanceObject);
        localStorage.distanceObjects = JSON.stringify(this.get("distanceObjects"));
    },
});