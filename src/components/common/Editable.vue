<template>
    <div class="w-full resize-none outline-none" contenteditable="true" ref="editable" v-on:blur="onBlurInput"></div>
</template>
<script>
    export default {
        props: ['value'],
        methods: {
            onBlurInput(){
                this.$emit('input', this.$refs.editable.innerText);
            }
        },
        mounted() {
            this.$refs.editable.innerText = this.value
        },
        watch: {
            value: {
                handler(newVal, oldVal) {
                    this.$refs.editable.innerText = newVal;
                }
            }
        }
    }
</script>

<style>
</style>