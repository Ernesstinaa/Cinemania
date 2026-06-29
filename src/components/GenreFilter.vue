<template>

<select @change="cambiar">

<option value="">

Todos los géneros

</option>

<option
v-for="g in genres"
:key="g.id"
:value="g.id">

{{g.name}}

</option>

</select>

</template>

<script setup>

defineProps({

genres:Array

})

const emit=defineEmits(["filter"])

function cambiar(e){

emit("filter",e.target.value)

}

</script>

<style scoped>

select{

padding:10px;
margin-left:20px;

}

</style>