<template>
  <q-page class="row">
    <div v-if="repoData.length > 0">
    <table>
      <tr>
        <th>Repository Name</th>
        <th>Repository URL</th>
        <th>Date of Last Update</th>
      </tr>
      <tr v-for = "(repo, rowNum) in repoData" v-bind:key="rowNum">
        <td>{{ repo.repo }}</td>
        <td>{{ repo.url }}</td>
        <td>{{ repo.last_update }}</td>
      </tr>
    </table>
    <p>There are {{ repoData.length }} repos in the list.</p>
  </div>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'MyRepos',
};
</script>

<script setup lang="ts">
//all the code for API calls
import { onMounted, ref } from 'vue';
import type {RepoApiInterface} from './ApiInterfaces';
import axios from 'axios';


  let repoData = ref<RepoApiInterface[]>([])

  onMounted(async () => {

    //this is where to go and get the repo data
    let allReposURI = 'http://localhost:9500/repos'

    //Use axios to load the repo data - readup on await to make
    //async calls easier
    let repoAPI = await axios.get<RepoApiInterface[]>(allReposURI)

    //if OK, set the repoData variable, so that we can render in the ui
    if(repoAPI.status == 200){
      repoData.value = repoAPI.data
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
