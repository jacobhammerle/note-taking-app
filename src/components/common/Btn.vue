<template>
    <button @click="onClick" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg h-12 focus:outline-none">
        <slot>Button</slot>
    </button>
</template>
<script>
    export default {
        name: 'btn',
        props: ['label'],
        methods: {
            onClick(){
                this.$emit('click')
            }
        }
    }
</script>

<style>
</style>