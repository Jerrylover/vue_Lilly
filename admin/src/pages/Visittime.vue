<template>
    <app-header></app-header>
    <div class="container-fluid context">
        <div class="row">
            
        </div>
    </div>
    <app-footer></app-footer>
</template>
<script>
    import api from '../config/api.js';
    module.exports = {
        data: function() {
            return {

            }
        },
        components: {
            'appHeader': require('../components/Header.vue'),
            'appFooter': require('../components/Footer.vue')
        }
    }
</script>