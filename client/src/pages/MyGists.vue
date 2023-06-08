<template>
    <q-page class="row">
      <div v-if="gistData.length > 0">
    <table>
      <tr>
        <th>My Gists</th>
      </tr>
      <tr v-for = "(gist, rowNum) in gistData" v-bind:key="rowNum">
        <td>ID: {{gist.id}}; Web address: {{gist.html_url}}</td>
      </tr>
    </table>
  </div>
    </q-page>
  </template>
  
  <script lang="ts">
  export default {
    name: 'MyGists',
  };
  </script>
  
  <script setup lang="ts">
  //Most code goes here
  import { onMounted, ref } from 'vue';
  import type {GistInterface} from './ApiInterfaces';
  import axios from 'axios';


  let gistData = ref<GistInterface[]>([])

  onMounted(async () => {

    //this is where to go and get the gist data
    let allGistsURI = 'http://localhost:9500/ghsecure/users/antonpr1992/gists'

    //Use axios to load the gist data - readup on await to make
    //async calls easier
    let gistAPI = await axios.get<GistInterface[]>(allGistsURI)

    //if OK, set the repoData variable, so that we can render in the ui
    if(gistAPI.status == 200){
      gistData.value = gistAPI.data
    }
  })
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped></style>