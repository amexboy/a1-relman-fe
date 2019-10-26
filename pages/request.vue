<template>
  <v-layout row >
    <v-flex xs12 md6>
      <v-combobox
        v-model="service"
        :items="services"
        label="Select the service the release not affects"
      ></v-combobox>
    </v-flex>
    <v-flex xs12 md6>
      <v-combobox
        v-model="template"
        :items="templates"
        label="Select the template you would like to send"
      ></v-combobox>
    </v-flex>
    <v-flex xs12 md6 v-if="template">
      <v-flex xs12 v-for="arg in args">
        <div v-if="arg.startsWith('{')">
          {{arg}}
          <html-editor v-model="data[arg]" :label="arg" ></html-editor>
        </div>
        <v-text-field v-model="data[arg]" :label="arg" v-else></v-text-field>
      </v-flex>
    </v-flex>
    <v-flex xs12 md6 v-if="result">
      <v-card light>
        <v-card-text v-html="result"></v-card-text>
      </v-card>
    </v-flex>
    </v-flex>
  </v-layout>
</template>


<script>
import HtmlEditor from "@/components/HtmlEditor"

export default {
  components: {
    HtmlEditor,
  },
  async asyncData({$axios}){
    let [services, templates] = await Promise.all([
      $axios.$get("/services")
            .then(services => services.map(s => s.name)),

      $axios.$get("/templates")
            .then(templates => templates.map(t => t.name))]
    )

    return {services, templates}
  },
  data: ()=>({
    data: {},
    template: null,
    service: null,
    args: [],
    result: null
  }),
  watch: {
    template(to){
      this.$axios.$get("/templates/" + to + "/service/"+ this.service + "/args")
          .then(res => {
            this.args = res.args
            this.data = res.defaults
          })
          .catch(res => this.args = [])
    },
    data: {
      deep: true,
      handler(to){
        let data = {
          service: this.service,
          ...this.data
        }
        this.$axios.$post("/templates/"+ this.template + "/preview", data)
            .then(result => this.result = result.message)
            .catch(_ => "something")
      }
    }
  }
}
</script>
