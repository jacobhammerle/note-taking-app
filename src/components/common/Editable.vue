<template>
  <div
    class="w-full resize-none outline-none text-2xl font-bold"
    ref="editable"
    contenteditable="true"
    v-on="listeners"
  />
</template>

<script>
export default {
    name: 'editable',
    props: {
        value: {
            type: String,
            default: '',
        }
    },
    computed: {
        listeners() {
            return { input: this.onInput }
        }
    },
    mounted() {
        this.$refs.editable.innerText = this.value
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.innerText)
        },
        resetValue() {
            this.$refs.editable.innerText = this.value
        }
    }
}

/*
Vue.directive('click-outside', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})
*/

</script>

<style>
</style>