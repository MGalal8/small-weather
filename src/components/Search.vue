<template>
    <div>
        <nav class="border-gray-200 px-2 sm:px-4 py-3 bg-blue-800">
            <div class="container flex flex-wrap justify-between items-center mx-auto px-2">
                <h1 class="text-xl text-white font-bold">Weather App</h1>
                <div class="flex justify-center">
                    <div class="sm:w-48">
                        <div ref="searchInput" class="input-group relative flex flex-wrap ">

                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input id="dropdown" data-bs-toggle="dropdown" aria-expanded="false" type="text"
                                class="dropdown-toggle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400"
                                v-model="searchTerm" placeholder="Search for a city...">

                            <ul v-if="dropDownToggle"
                                class="dropdown-menu absolute bg-white z-50 mt-3 py-3 w-full border-2 border-grey text-left"
                                aria-labelledby="dropdown"
                                >

                                <li v-for="city in searchInCities" :key="city.city_id" @click="selectCity(city)"
                                    class="dropdown-item text-sm py-2 px-4 block w-full cursor-pointer text-gray-700 hover:bg-gray-100">
                                    {{ city.city_name }}
                                </li>

                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { data } from '../assets/cities_2000.json'

export default {
    emits: ['cityInfo'],
    setup(props, { emit } ) {
        let searchTerm = ref('');
        let cities = data;

        // search for matching from cities_20000
        const searchInCities = computed(() => {
            if (searchTerm.value === '') {
                return []
            }
            let matches = 0
            return cities.filter(city => {
                if(city?.city_name?.toLowerCase()
                    .includes( searchTerm?.value?.toLowerCase())
                    && matches < 10 ){
                    matches++
                    return city
                }
            })
        });

        // Select and set city with coordinates
        const selectCity = (city) => {
            searchTerm.value = ''
            emit('cityInfo', {
                city: city.city_name,
                lon: city.lon,
                lat: city.lat,
                search: true
            })
        }

        const dropDownToggle = computed(() => {
            if(searchInCities.value.length > 0){
                return true
            }
        });

        return {
            searchTerm,
            cities,
            searchInCities,
            dropDownToggle,
            selectCity,
        }
    }
}
</script>