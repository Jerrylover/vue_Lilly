<template>
<div>
<pre>{{question | json}}</pre>
</div>
</template>
<script>
    module.exports = {
        data: function() {
            return {}
        },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet']
    }
</script>