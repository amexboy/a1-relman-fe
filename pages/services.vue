<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
            Services List
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
            ></v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// const loadService = function (name){
//     return axios.get("/?q="+ name)
//                 .then(({data}) => {
//                     return data;
//                 })
//                 .catch(err => {
//                     console.log(err)
//                     return {}
//                 })
// };

//const reload = function (){
//        return Promise.all(serviceNames
//            .map(name => loadService(name))
//        )
//                      .then(results => results.filter(service => service.name))
//    }


export default {
    async asyncData({ $axios }){
        let services = await $axios.$get("/services")
                                  .then(({data}) => data)
                                   .catch(err => {
                                       console.log(err)

                                       return []
                                   })

        return {services}
    },
    data(){
        return {
            services: [],
            search: '',
            headers: [
                {
                    text: 'Service',
                    align: 'left',
                    value: 'name',
                },
                { text: 'Owner Team', value: 'team' },
                { text: 'Slack Channel', value: 'channel' },
                { text: 'Slack Handle', value: 'handle' },
                { text: 'Team Lead', value: 'teamLead' },
                { text: 'Actions', filterable: false },
            ]
        }
    },
    methods: {
    }
}
</script>
