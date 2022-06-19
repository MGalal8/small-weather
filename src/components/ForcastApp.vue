<template>
  <div>
    <Search></Search>
    <Tabs></Tabs>

  <div class="container">
    <!-- Hourly section -->
    <div class="hourly bg-white w-full pb-3">
    <span class="text-xs py-2 text-right block right-0   px-3">  Updated: </span>
      <h1 class="block text-left text-lg font-bold  p-5">Next Hours: <span class="font-normal text-blue-600">City</span></h1>
      <div  class="flex flex-row justify-between m-auto p-2  divide-x">
        <div class="basis-1/4 text-center">
          <p class="text-gray-600 font-medium">28 &deg; </p>
          <p class="text-blue-600">15% </p>
          <img src="" />
          <p class=" font-medium text-gray-600">7:00 PM </p>
        </div>

        <div class="basis-1/4 text-center">
          <p class="text-gray-600 font-medium">28 &deg; </p>
          <p class="text-blue-600">15% </p>
          <img src="" />
          <p class=" font-medium text-gray-600">7:00 PM </p>
        </div>

        <div class="basis-1/4 text-center">
          <p class="text-gray-600 font-medium">28 &deg; </p>
          <p class="text-blue-600">15% </p>
          <img src="" />
          <p class=" font-medium text-gray-600">7:00 PM </p>
        </div>
      </div>
    </div>

    <!-- Daily section -->

    <div class="daily  bg-white w-full mt-2 p-5">
       <h1 class="text-left font-bold text-lg mb-2">Next 5 Days: <span class="font-normal text-blue-600">City</span></h1>
      <div class="flex flex-col  divide-y">
        <div class="flex-row w-full p-5 ">
          <div class="w-full flex text-center  justify-center items-center border-separate ">
            <div class="w-1/4"></div>
            <div class="w-1/2"> <span class="font-bold">Mon, Jan 30 <br> sky is clear</span> </div>
            <div class="w-1/3"> 30&deg; &nbsp;  18&deg;</div>
          </div>
        </div>

         <div class="flex-row w-full p-5 ">
          <div class="w-full flex text-center  justify-center items-center border-separate ">
            <div class="w-1/4"></div>
            <div class="w-1/2"> <span class="font-bold">Mon, Jan 30 <br> sky is clear</span> </div>
            <div class="w-1/3"> 30&deg; &nbsp;  18&deg;</div>
          </div>
        </div>

         <div class="flex-row w-full p-5 ">
          <div class="w-full flex text-center  justify-center items-center border-separate ">
            <div class="w-1/4"></div>
            <div class="w-1/2"> <span class="font-bold">Mon, Jan 30 <br> sky is clear</span> </div>
            <div class="w-1/3"> 30&deg; &nbsp;  18&deg;</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

  import { reactive, toRefs } from 'vue'
  import Search from './Search.vue'
  import Tabs from './Tabs.vue'

  export default {
    components: {
      Search,
      Tabs,
    },

    setup() {
      let weather = reactive({
        dataHours: [],
        dataDaily: [],
        city: '',
        lon: '',
        lat: '',
      })



    return {
      ...toRefs(weather),
    }
  }
  }
</script>
