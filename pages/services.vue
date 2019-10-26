<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      lg6
    >
      <v-card>
        <v-card-title class="headline">
            Services List
            <v-spacer></v-spacer>

            <v-text-field
                v-model="search"
                append-icon="mdi-search"
                label="Search"
                single-line
                hide-details></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="services"
                :search="search"
            >
                <template v-slot:item.action="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
    async asyncData({ $axios }){
        let services = await $axios.$get("/services")
                                   .catch(err => [])

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
                { text: 'Slack Channel', value: 'slack-channel' },
                { text: 'Slack Handle', value: 'slack-group' },
                { text: 'Team', value: 'team' },
                { text: 'Actions', value: 'action', filterable: false },
            ]
        }
    },
    methods: {
    }
}
</script>
