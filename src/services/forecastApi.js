
import axios from 'axios';

class Forecast {

    baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    constructor() {}

    setForecast( [city, lon , lat] ) {
        this.cityName = city;
        this.lon = lon;
        this.lat = lat;

        this.dataHours = null
        this.dataDays = null
        this.errorData = null
    }


    /**
     * Refresh and Update weather data.
    */
    async updateWeather() {
        let tempHourlyData, tempDailyData = null;
        try {
            tempHourlyData = await this.fetchHourly()
            tempDailyData = await this.fetchDaily()
        } catch (e) {
            this.errorData = 'Somthing went wrong with forecast data'
        }
        this.setForcast(tempHourlyData, tempDailyData);
    }


     /**
      * Fetch weather forecast Hourly.
      */
     async fetchHourly() {
            const response = await axios(`${this.baseApiUrl}?units=metric&lat=${this.lat}&lon=${this.lon}&appid=${ import.meta.env.VITE_API_KEY }`)
            //  const response = await axios(`./hourly.json`) // data from openweathermap for testing
             return  await Object.freeze(response.data)
        }

    /**
      * Fetch weather forecast  Daily.
    */
    async fetchDaily() {
            // const response = await axios(`${this.baseApiUrl}/daily?units=metric&lat=${this.lat}&lon=${this.lon}&appid=${ import.meta.env.VITE_API_KEY }`)
            const response = await axios(`./daily.json`) // data from openweathermap for testing
            return  await Object.freeze(response.data);
        }

    /**
     * Set forecast data.
     * @param  {} tempHourlyData
     * @param  {} tempDailyData
     */
    setForcast(tempHourlyData, tempDailyData) {
        this.dataHours = tempHourlyData;
        this.dataDays = tempDailyData;
    }
}
export default Forecast;