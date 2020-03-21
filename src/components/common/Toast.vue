<template>
    <div class="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm hidden">
        <input type="checkbox" class="hidden" id="footertoast">

        <label :class="[color ? `bg-${color}-500` : 'bg-gray-500',]" class="close cursor-pointer flex items-start justify-between w-full p-2 h-auto rounded shadow-lg text-white" title="close" for="footertoast">
        {{ message }}
        
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        </label>
    </div>
</template>

<script>
export default {
    name: 'toast',
    props: ['message', 'color'],
    data() {
        return {

        }
    },
    methods: {
        toast() {
            const toast = document.querySelector('.alert-toast')
            toast.classList.toggle('hidden')

            setTimeout(function(){ 
                toast.classList.toggle('hidden')
            }, 3000);
        }
    }
}
</script>

<style>
/*Toast open/load animation*/
.alert-toast {
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/*Toast close animation*/
.alert-toast input:checked ~ * {
    -webkit-animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes slide-in-right{0%{-webkit-transform:translateX(1000px);transform:translateX(1000px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes fade-out-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(50px);transform:translateX(50px);opacity:0}}@keyframes fade-out-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(50px);transform:translateX(50px);opacity:0}}
</style>