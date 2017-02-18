<template>
<div>
<pre>{{JSON.stringify(question)}}</pre>
</div>
</template>
<script>
    export default {
        data: function() {
            return {}
        },
     props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer']
    }
</script>
