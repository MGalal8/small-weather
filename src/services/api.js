
import axios from 'axios';

class Forecast {
    constructor(city, lon , lat) {
        this.cityName = city;
        this.lon = lon;
        this.lat = lat;
        this.baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

        this.dataHours = null
        this.dataDays = null
        this.errorDaily = null
    }

    /**
     * Update weather data.
    */
    async updateWeather() {
        let dataH, dataD = null;
        try {
         dataH = await this.fetchWeather()
         dataD = await this.fetchDaily()
        } catch (e) {
            console.log(e)
        }
        this.setForcast(dataH, dataD);
    }

     /**
      * Fetch weather forecast  Hourly.
      */
     async fetchWeather() {
        let response = null;
        try {
            response = await axios(`hourly.json`)
            // response = await axios(`${this.baseApiUrl}?units=metric&lat=${this.lat}&lon=${this.lon}&appid=${ import.meta.env.VITE_API_KEY }`)
        } catch (error) {
            this.errorHourly = 'Somthing went wrong with the hours forecast'
        }
        return  await Object.freeze(response.data)
    }

    /**
      * Fetch weather forecast  Daily.
      */
    async fetchDaily() {
        let response = null;
        try {
            // const response = await axios(`${this.baseApiUrl}/daily?units=metric&lat=${this.lat}&lon=${this.lon}&appid=${ import.meta.env.VITE_API_KEY }`)
            response = await axios(`daily.json`)
        } catch (error) {
            this.errorDaily = 'Somthing went wrong with the daily forecast'
        }
        return  await Object.freeze(response.data);
     }

    /**
     * Set forecast data.
     * @param  {} dataH
     * @param  {} dataD
     */
    setForcast(dataH, dataD) {
        this.dataHours = dataH;
        this.dataDays = dataD;
    }

}

export default Forecast;