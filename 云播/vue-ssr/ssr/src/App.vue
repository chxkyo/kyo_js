<template>
    <div>
        <foo></foo>
        <bar></bar>
    </div>
</template>
<script>
    import Foo from './components/Foo.vue';
    import Bar from './components/Bar.vue';
    export default {
        components:{
            Foo,
            Bar
        }
    }
</script>