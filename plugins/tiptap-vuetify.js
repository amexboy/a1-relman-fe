import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

export default ({ app }) => {
    Vue.use(TiptapVuetifyPlugin, {
        vuetify: app.vuetify,
        iconsGroup: 'md'
    })

//    Vue.use(VuetifyDialog, {
//        context: {
//            vuetify: app.vuetify
//        }
//    })
}
