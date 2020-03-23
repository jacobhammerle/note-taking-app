<template>
    <div class="w-full resize-none outline-none leading-relaxed" v-bind:id="id" contenteditable="true" ref="editable" @blur="onBlurInput"></div>
</template>
<script>
    export default {
        props: {
            value: null,
            index: null,
            completed: false,
            id: null
        },
        data() {
            return {
                data: {
                    text: null,
                    completed: false,
                    index: null
                }
            }
        },
        methods: {
            onBlurInput(){
                this.data.text = this.$refs.editable.innerText
                this.data.index = this.index
                this.data.completed = this.completed
                this.$emit('change', this.data)
                this.$emit('input', this.$refs.editable.innerText)
            },
            setContentCarot(){
                let el = document.getElementById("content")
                el.focus()
            },
            setItemCarot(){
                let el = document.getElementById("item-0")
                el.focus()
            }
        },
        mounted() {
            this.$refs.editable.innerText = this.value
            if(this.id == 'content'){
                this.setContentCarot()
            }else if(this.id == 'item-0'){
                this.setItemCarot()
            }
        },
        watch: {
            value: {
                handler(newVal, oldVal) {
                    this.$refs.editable.innerText = newVal

                    if(this.id == 'content'){
                        this.setContentCarot()
                    }else if(this.id == 'item-0'){
                        this.setItemCarot()
                    }
                }
            }
        }
    }
</script>

<style>
</style>