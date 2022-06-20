<template>
  <div>
    <Search @cityInfo="getCityInfo"></Search>

    <Tabs
        :class="{'opacity-50 bg-blue-600': fromSearch}"
        @cityInfo="getCityInfo"
        @refreshForcast="refreshForcast" >
    </Tabs>

  <div class="container">
    <!-- Hourly section -->
    <div class="hourly bg-white w-full pb-3">
    <span class="text-xs py-2 text-right block right-0   px-3">  Updated: {{ weather.timeOfUpdate}}</span>
      <h1 class="block text-left text-lg font-bold  p-5">Next Hours: <span class="font-normal text-blue-600">{{weather.city}}</span></h1>
      <div class="flex flex-row justify-between m-auto p-2  divide-x">
        <div
          v-for="hour in hourlyForcastLimit"
          :key="hour.id"
          class="basis-1/4 text-center">
          <p class="text-gray-600 font-medium">{{ Math.round(hour.main.temp) }}&deg; </p>
          <p class="text-blue-600">{{ Math.round(hour.main.humidity) }}% </p>
          <img :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`" />
          <p class=" font-medium text-gray-600">{{ getHour(hour.dt) }} </p>
        </div>
      </div>
       <div class="text-center text-red-600">
          {{ errorData }}
        </div>
    </div>

    <!-- Daily section -->

    <div class="daily  bg-white w-full mt-2 p-5">
       <h1 class="text-left font-bold text-lg mb-2">Next 5 Days: <span class="font-normal text-blue-600">{{ weather.city }}</span></h1>
      <div class="flex flex-col  divide-y">
        <div
          v-for="day in dailyForcastLimit"
          :key="day.id"
          class="flex-row w-full p-5 ">
          <div class="w-full flex text-center  justify-center items-center border-separate ">
            <div class="w-1/4"><img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`" /></div>
            <div class="w-1/2"> <span class="font-bold">{{ getDay(day.dt) }} </span> <br> {{ day.weather[0].main }} {{ day.weather[0].description }}  </div>
            <div class="w-1/3"> {{ Math.round(day.temp.min) }}&deg; &nbsp;  {{ Math.round(day.temp.max) }}&deg;</div>
          </div>
        </div>
      </div>
      <div class="text-center text-red-600">
          {{ errorData }}
        </div>
    </div>


    </div>
  </div>
</template>

<script>

import { computed, onMounted } from '@vue/runtime-core'
  import { ref, reactive, toRefs } from 'vue'
  import Forecast from '../services/forecastApi.js'
  import {getHour, getDay, getNow} from '../helpers/utils.js'
  import Search from './Search.vue'
  import Tabs from './Tabs.vue'

  export default {
    components: {
      Search,
      Tabs,
    },

    setup() {
      let newForcast = null
      let cityData = reactive([])
      let fromSearch = ref(false)
      let weather = reactive({
        dataHours: [],
        dataDaily: [],
        timeOfUpdate:'',
        errorData: '',
        city: '',
        lon: '',
        lat: '',
      })

      onMounted(() => { getCityInfo() })

      const getCityInfo = (city) => {
         if(city !== undefined) {
           cityData = [...city]
           weather.city = city[0]
           city.search? fromSearch.value = true : fromSearch.value = false;
         }
         refreshForcast()
        }

      // refresh forcast data
      const refreshForcast = async() => {
        await fetchWeather()
        weather.timeOfUpdate = getNow()
      }

      const fetchWeather = async() => {
        // Create instance from Forecast class
        newForcast =  new Forecast();
        newForcast.setForecast(cityData);
        await newForcast.updateWeather()

        // get Forcast Hours
        weather.dataHours =  await newForcast.dataHours
        // get Forcast Days
        weather.dataDaily =  await newForcast.dataDays
        // get Forcast error
        weather.errorData =  newForcast.errorData
      }


      const hourlyForcastLimit = computed(() => {
        if(weather?.dataHours?.cod == 200) {
          return weather.dataHours.list.slice(0, 4)
        }
      });

      const dailyForcastLimit = computed(() => {
        if(weather?.dataDaily?.cod == 200) {
          return weather.dataDaily.list.slice(0, 5)
        }
      });

      const errorData = computed(() => {
        if(weather?.errorData) {
          return weather.errorData
        }
      })

      return {
        newForcast,
        cityData,
        weather,
        getCityInfo,
        hourlyForcastLimit,
        dailyForcastLimit,
        getHour,
        getDay,
        refreshForcast,
        fromSearch,
        errorData,
      }
    }
  }
</script>
