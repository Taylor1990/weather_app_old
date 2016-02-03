var App = React.createClass({
    getInitialState: function () {
        var cities = localStorage.getItem('cities');
        var citiesList = [];

        if (cities) {
            citiesList = cities.split(',');
        }

        return {data: false, citiesList: citiesList};
    },
    componentDidMount: function () {
        if (this.state.citiesList) {
            this.queryCity(this.state.citiesList[0]);
        }
    },
    renderResponse: function (res) {
        this.setState({data: res});
    },
    queryCity: function (nameCity) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            type: 'GET',
            data: {
                q: nameCity,
                appid: '13cb7fc7bbcbb873b6c84b9e84df4507'
            },
            success: this.renderResponse
        });
    },
    render: function () {
        return (
            <div>
                <City queryCity={this.queryCity} citiesList={this.state.citiesList}/>
                <Weather data={this.state.data}/>
            </div>
        );
    }
});

var City = React.createClass({
    getInitialState: function () {
        return {citiesList: this.props.citiesList};
    },
    updateCityList: function (cityName) {
        var citiesList = this.state.citiesList;
        citiesList.push(cityName);
        localStorage.setItem('cities', citiesList.join())
        this.setState({'citiesList': citiesList});
    },
    render: function () {
        var CityForm = React.createClass({
            getInitialState: function () {
                return {textValue: this.props.cityText};
            },
            addCity: function () {
                // TODO: проверить город регулярным выражением
                this.props.updateCityList(this.state.textValue);
            },
            handlerChange: function (event) {
                this.setState({textValue: event.target.value});
            },
            render: function () {
                return (
                    <div>
                        <input type="text" onChange={this.handlerChange}/>
                        <input type="button" value="Добавить город" onClick={this.addCity}/>
                    </div>
                );
            }
        })

        var CityList = React.createClass({
            getInitialState: function () {
                return ({citiesList: this.props.citiesList});
            },
            deleteCity: function (cityName) {
                var citiesList = this.state.citiesList;

                citiesList.splice(citiesList.indexOf(cityName), 1);

                localStorage.setItem('cities', citiesList.join());
                if (citiesList.length) {
                    this.setState({'citiesList': citiesList, cityText: citiesList[0]});
                } else {
                    this.setState({'citiesList': [], cityText: ''})
                }
                ;
            },
            render: function () {
                var CityItem = React.createClass({
                    queryCity: function (event) {
                        var title = event.target.parentElement.textContent;
                        this.props.queryCity(title);
                    },
                    deleteCity: function (event) {
                        var title = event.target.parentElement.textContent;
                        this.props.deleteCity(title);
                    },
                    render: function () {
                        return (
                            <li>
                                <div onClick={this.queryCity}>{this.props.title}</div>
                                <input type="button" value="Удалить" onClick={this.deleteCity}/>
                            </li>
                        );
                    }
                });

                return (
                    <ul>
                        {
                            this.state.citiesList.map(function (item) {
                                return (<CityItem title={item} key={item} queryCity={this.props.queryCity}
                                                  deleteCity={this.deleteCity}/>)
                            }, this)
                        }
                    </ul>
                );
            }
        })

        return (
            <div>
                <CityForm cityText={this.state.cityText} updateCityList={this.updateCityList}/>
                <CityList queryCity={this.props.queryCity} citiesList={this.state.citiesList}/>
            </div>
        );
    }
});

var Weather = React.createClass({
    getProperty: function (property) {
        if (this.props.data) {
            switch (property) {
                case 'lon':
                    return this.props.data.coord.lon;
                case 'lat':
                    return this.props.data.coord.lat;
                case 'temp':
                    return Math.round(this.props.data.main.temp - 273.15);
                case 'weather':
                    return this.props.data.weather[0].main;
                case 'description':
                    return this.props.data.weather[0].description;
                case 'pressure':
                    return this.props.data.main.pressure;
                case 'humidity':
                    return this.props.data.main.humidity;
                case 'temp_min':
                    return Math.round(this.props.data.main.temp_min - 273.15);
                case 'temp_max':
                    return Math.round(this.props.data.main.temp_max - 273.15);
                case 'sea_level':
                    return this.props.data.main.sea_level;
                case 'grnd_level':
                    return this.props.data.main.grnd_level;
                case 'speed':
                    return this.props.data.wind.speed;
                case 'deg':
                    return this.props.data.wind.deg;
                case 'clouds':
                    return this.props.data.clouds.all;
                case 'country':
                    return this.props.data.sys.country;
                case 'sunrise':
                    return this.props.data.sys.sunrise;
                case 'sunset':
                    return this.props.data.sys.sunset;
                case 'name':
                    return this.props.data.name;
            }
        }
        return '';
    },
    render: function () {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Longitude</td>
                    <td>Latitude</td>
                </tr>
                <tr>
                    <td><input type="text" value={this.getProperty('lon')}/></td>
                    <td><input type="text" value={this.getProperty('lat')}/></td>
                </tr>
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


ReactDOM.render(
    <App />,
    document.getElementById('content')
);
