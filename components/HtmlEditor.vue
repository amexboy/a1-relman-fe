<template>
  <div>
    <tiptap-vuetify v-model="content" :extensions="extensions"/>
  </div>
</template>

<script>
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify';

export default {
  name: 'html-editor',
  components: { TiptapVuetify },
  props: ["value"],
  data: () => ({
    extensions: [
      // Render in the Bubble menu
      [
        Link,
        {
          renderIn: 'bubbleMenu'
        }
      ],
      [
        Underline,
        {
          renderIn: 'bubbleMenu'
        }
      ],
      [
        Strike,
        {
          renderIn: 'bubbleMenu'
        }
      ],
      [
        Bold,
        {
          renderIn: 'bubbleMenu',
          // extension's options
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      // Render in the toolbar
      [
        Blockquote,
        {
          renderIn: 'toolbar'
        }
      ],
      // You can use a short form, the default "renderIn" is "'toolbar'"
      History,
      Strike,
      Italic,
      ListItem, // if you need to use a list (BulletList, OrderedList)
      BulletList,
      OrderedList,
      [
        Heading,
        {
          // Options that fall into the tiptap's extension
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak // line break on Shift + Ctrl + Enter
    ]
  }),
  computed: {
    content: {
      get () {return this.value},
      set (to) {this.$emit("input", to)}
    }
  }
}
</script>
