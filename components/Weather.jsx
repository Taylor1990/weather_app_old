var React = require('react');
var $ = require('jquery');
var CoordForm = require('./CoordForm.jsx');

var Weather = React.createClass({
    getInitialState: function() {
        return {data: false};
    },
    componentWillReceiveProps: function(nextData){
        this.setState({data: nextData.data});
    },
    getProperty: function (property) {
        if (this.state.data) {
            switch (property) {
                case 'lon':
                    return this.state.data.coord.lon;
                case 'lat':
                    return this.state.data.coord.lat;
                case 'temp':
                    return Math.round(this.state.data.main.temp - 273.15);
                case 'weather':
                    return this.state.data.weather[0].main;
                case 'description':
                    return this.state.data.weather[0].description;
                case 'pressure':
                    return this.state.data.main.pressure;
                case 'humidity':
                    return this.state.data.main.humidity;
                case 'temp_min':
                    return Math.round(this.state.data.main.temp_min - 273.15);
                case 'temp_max':
                    return Math.round(this.state.data.main.temp_max - 273.15);
                case 'sea_level':
                    return this.state.data.main.sea_level;
                case 'grnd_level':
                    return this.state.data.main.grnd_level;
                case 'speed':
                    return this.state.data.wind.speed;
                case 'deg':
                    return this.state.data.wind.deg;
                case 'clouds':
                    return this.state.data.clouds.all;
                case 'country':
                    return this.state.data.sys.country;
                case 'sunrise':
                    return this.timeConverter(this.state.data.sys.sunrise);
                case 'sunset':
                    return this.timeConverter(this.state.data.sys.sunset);
                case 'name':
                    return this.state.data.name;
            }
        }
        return '';
    },
    getWeatherCoord: function(lon, lat) {
        // TODO: проверка
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            type: 'GET',
            data: {
                lat: lat,
                lon: lon,
                appid: '13cb7fc7bbcbb873b6c84b9e84df4507'
            },
            success: function(res){
                this.setState({data: res});
            }.bind(this)
        });
    },
    timeConverter: function(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    },
    render: function () {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Longitude</td>
                    <td>Latitude</td>
                </tr>

                <CoordForm lon={this.getProperty('lon')} lat={this.getProperty('lat')} getWeatherCoord={this.getWeatherCoord}/>

                <tr>
                    <td>Weather</td>
                    <td>Description</td>
                </tr>
                <tr>
                    <td>{this.getProperty('weather')}</td>
                    <td>{this.getProperty('description')}</td>
                </tr>
                <tr>
                    <td>Temperature, C</td>
                    <td>Pressure, hPa</td>
                    <td>Humidity, %</td>
                    <td>Temperature(min), C</td>
                    <td>Temperature(max), C</td>
                    <td>Sea level, hPa</td>
                    <td>Ground level, hPa</td>
                </tr>
                <tr>
                    <td>{this.getProperty('temp')}</td>
                    <td>{this.getProperty('pressure')}</td>
                    <td>{this.getProperty('humidity')}</td>
                    <td>{this.getProperty('temp_min')}</td>
                    <td>{this.getProperty('temp_max')}</td>
                    <td>{this.getProperty('sea_level')}</td>
                    <td>{this.getProperty('grnd_level')}</td>
                </tr>
                <tr>
                    <td>Wind Speed, m/c</td>
                    <td>Wind Degrees</td>
                </tr>
                <tr>
                    <td>{this.getProperty('speed')}</td>
                    <td>{this.getProperty('deg')}</td>
                </tr>
                <tr>
                    <td>Cloudness, %</td>
                </tr>
                <tr>
                    <td>{this.getProperty('clouds')}</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>Sunrise Time, unix</td>
                    <td>Sunset Time, unix</td>
                </tr>
                <tr>
                    <td>{this.getProperty('country')}</td>
                    <td>{this.getProperty('sunrise')}</td>
                    <td>{this.getProperty('sunset')}</td>
                </tr>
                <tr>
                    <td>Name City</td>
                </tr>
                <tr>
                    <td>{this.getProperty('name')}</td>
                </tr>
                </tbody>
            </table>
        );
    }
});

module.exports = Weather;