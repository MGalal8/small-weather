<template>
    <div class="tabs bg-white">
        <div class=" flex flex-row justify-between  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="text-md">
                <li
                    v-for="(city, index) in preDefinedCities"
                    :key="city.id"
                    @click.prevent="setCity(city, index)"
                    class="inline-block p-4 border-b-2 border-transparent cursor-pointer text-black "
                    :class="{'border-blue-700': index === tabActive }"
                    >
                    {{ city.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import preDefinedCities from '../services/cities.js'
import {ref, onMounted} from 'vue'

export default {

    setup() {
    const tabActive = ref();

    onMounted(() => {
    });


    return {
        preDefinedCities,
        tabActive,
    }
    }
}
</script>