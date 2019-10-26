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
          Templates List
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
            :items="templates"
            :search="search"
          >
            <template v-slot:item.required-args="{ item }">
              <v-chip
                class="ma-2"
                color="pink"
                label
                text-color="white"
                v-for="arg in item['required-args']"
              >
                <v-icon left>mdi-label</v-icon>
                {{arg}}
              </v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                edit
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
    let templates = await $axios.$get("/templates")
                                .catch(err => [])

    return {templates}
  },
  data(){
    return {
      templates: [],
      search: '',
      headers: [
        {
          text: 'Template',
          align: 'left',
          value: 'name',
        },
        { text: 'Created-By', value: 'created-by' },
        { text: 'Required-Args', value: 'required-args' },
        { text: 'Actions', value: 'action', filterable: false, sortable: false },
      ]
    }
  },
  methods: {
  }
}
</script>
