<template>
    <div class="w-full resize-none outline-none leading-relaxed" v-bind:id="id" contenteditable="true" ref="editable" v-on:blur="onBlurInput"></div>
</template>
<script>
    export default {
        props: {
            value: null,
            index: null,
            id: null
        },
        data() {
            return {
                data: {
                    text: null,
                    index: null
                }
            }
        },
        methods: {
            onBlurInput(){
                this.data.text = this.$refs.editable.innerText
                this.data.index = this.index
                this.$emit('input', this.$refs.editable.innerText)
                this.$emit('change', this.data)
            },
            setCarot(){
                let el = document.getElementById("content")
                el.focus()
            }
        },
        mounted() {
            this.$refs.editable.innerText = this.value

            if(this.id){
                this.setCarot()
            }
        },
        watch: {
            value: {
                handler(newVal, oldVal) {
                    this.$refs.editable.innerText = newVal

                    if(this.id){
                        this.setCarot()
                    }
                }
            }
        }
    }
</script>

<style>
</style>