<template>
    <div class="w-full resize-none outline-none leading-relaxed" v-bind:id="id" contenteditable="true" ref="editable" v-on:blur="onBlurInput"></div>
</template>
<script>
    export default {
        props: {
            value: null,
            id: null
        },
        methods: {
            onBlurInput(){
                this.$emit('input', this.$refs.editable.innerText);
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