var React = require('react');
var $ = require('jquery');
var City = require('./City.jsx');
var Weather = require('./Weather.jsx');

var App = React.createClass({
    getInitialState: function () {
        var cities = localStorage.getItem('cities');
        var citiesList = [];

        if (cities) {
            citiesList = cities.split(',');
            this.queryCity(citiesList[0]);
        }

        return {data: false, citiesList: citiesList};
    },
    queryCity: function (nameCity) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            type: 'GET',
            data: {
                q: nameCity,
                appid: '13cb7fc7bbcbb873b6c84b9e84df4507'
            },
            success: function (res) {
                this.setState({data: res});
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <City queryCity={this.queryCity} citiesList={this.state.citiesList} />
                <Weather data={this.state.data} />
            </div>
        );
    }
});

module.exports = App;