<template>
    <div>患者&nbsp;&nbsp;&nbsp;{{obj.detail.patient_name}}:&nbsp;&nbsp;&nbsp;{{obj.detail.pipedesc}}</div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        props: ['obj'],
    }
</script>