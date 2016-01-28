var App = React.createClass({
    render: function() {
        return (
            <City />
        );
    }
});

var City = React.createClass({
    render: function() {
        var CityForm = React.createClass({
            getInitialState : function() {
                var cities = localStorage.getItem('cities');
                var cities_array;

                if(cities) {
                    cities_array = cities.split(',');
                    return {textValue: cities_array[0]}
                }

                return {textValue: ''};
            },
            componentDidMount : function() {
                var idButton = this.props.idButton;
                var city_name = document.getElementById(this.props.idTextInput);

                document.getElementById(idButton).onclick = function(){
                    // TODO: проверить город регулярным выражением
                    $.ajax({
                        url: "http://api.openweathermap.org/data/2.5/weather",
                        type: 'GET',
                        data: {
                            q: city_name.value,
                            appid : '13cb7fc7bbcbb873b6c84b9e84df4507'
                        },
                        success: function(res) {
                            var cities = localStorage.getItem('cities');
                            var cities_array;

                            if(cities) {
                                cities_array = cities.split(',');
                            } else {
                                cities_array = [];
                            }

                            cities_array.push(city_name.value);
                            localStorage.setItem('cities', cities_array.join());
                        }
                    });
                };
            },
            render: function() {
                return (
                    <div>
                        <input id = {this.props.idTextInput} type="text" defaultValue = {this.state.textValue}/>
                        <input id = {this.props.idButton} type="button" value="Добавить город" />
                    </div>
                );
            }
        })

        var CityList = React.createClass({
            getInitialState: function(){

            },
            render: function() {
                return (
                    <ul>
                        <li>Test</li>
                    </ul>
                );
            }
        })

        return (
           <div>
               <CityForm idButton="CityForm_button" idTextInput="CityForm_text"/>
               <CityList />
           </div>
        );
    }
});


ReactDOM.render(
    <App />,
    document.getElementById('content')
);
