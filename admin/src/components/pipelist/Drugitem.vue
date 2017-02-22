<template>
    <div>
        <table class="table table-bordered" style="padding: 0px">
            <tr>
                <th class="light-th">类型</th>
                <th class="light-th">行为日期</th>
                <th class="light-th">药名</th>
                <th class="light-th">剂量</th>
                <th class="light-th">漏服天数</th>
                <th class="light-th">备注</th>
            </tr>
            <tr>
                <td>{{obj.detail.typedesc}}</td>
                <td>{{obj.detail.recorrd_date}}</td>
                <td>{{obj.detail.medicine_name}}</td>
                <td>{{obj.detail.value}}</td>
                <td>{{obj.detail.missdaycnt}}</td>
                <td>{{obj.detail.content}}</td>
            </tr>
        </table>
    </div>
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
