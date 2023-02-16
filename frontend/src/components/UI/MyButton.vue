<template>
    <button class="btn">
        <slot>Create</slot>
    </button>
</template>

<script>
export default{
    name: "my-button"    
}

</script>

<style scoped>

.btn{
    padding: 10px 20px;
    margin: 10px 0px;
    align-self: flex-start;
    background:none;
    border: 1px solid black;
}
</style>