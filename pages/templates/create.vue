<template>
  <v-layout row
            justify-center
            align-center>
    <v-flex xs12 sm10>
      <v-card light>
        <v-card-text>
            <v-layout row>
                <v-flex xs12 sm8 md6>
                    <v-text-field
                        v-model="name"
                        hint="Template name"
                        label="Name"/>
                </v-flex>
                <v-flex xs12>
                    <client-only>
                        <html-editor v-model="content"></html-editor>
                    </client-only>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text primary :loading="saving" @click="create"><v-icon>keyboard_arrow_right</v-icon> Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import HtmlEditor from "@/components/HtmlEditor"

export default {
  components: {
    HtmlEditor,
  },
  data () {
    return {
      saving: false,
      name: null,
      content: `<h1>Your template goes here</h1>
    <p>This is an HTML editor. Do as you will. And of cource you can't inject script (don't even bother).</p>

    This uses mustach(partially) refere <a hrep="https://github.com/fotoetienne/cljstache" target="_blank">here</>
    <p>If you want to ask the requester to enter some information you can add place holders like the following</p>

    <p> {{expectedEffect}} </p>

    <p> This will cause us to show prompt to enter this information when requesting for a release note.
    </p>
    <blockquote>Enjoy</blockquote>
`
    }
  },
  methods: {
    create(){
      let data = {
        name: this.name,
        template: this.content
      }

      this.saving = true;
      this.$axios.$post("/templates", data)
          .then(res => console.log(res))
          .catch(err => console.log(err))
          .then(_ => this.saving = false)
    }
  }
}
</script>
