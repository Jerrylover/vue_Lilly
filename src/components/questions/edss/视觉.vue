<template>
    <div class="edss-tip">
        <table class="table table-bordered table-striped">
            <thead>
                <th>视觉功能</th>
                <th>备 注</th>
            </thead>
            <tbody>
                <tr>
                    <td>视力(矫正后)</td>
                    <td> 视力评分是通过患者站在距离5米处读Snellen视力表得出的，识别错误不能超过一个。</td>
                </tr>
                <tr>
                    <td>视野(粗侧)</td>
                    <td>
                        <p>0 = 正常</p>
                        <p>1 = 仅有体征，仅在正式视野检查时发现视野缺损</p>
                        <p>2 = 中度，患者能感觉到视野缺损，视野检查发现不完全偏盲</p>
                        <p>3 = 重度，完全同向偏盲或全盲</p>
                    </td>
                </tr>
                <tr>
                    <td>视野缺损（视野计结果）</td>
                    <td> 0 = 无 1 = 小，仅在正式检查中被发现 2 = 大，患者有主诉 视乳头苍白 0 = 无1 = 有
                    </td>
                </tr>
            </tbody>
        </table>
        <ul class="list-unstyled">
            <li>0.正常</li>
            <li>1.视乳头苍白和/或小盲点和/或差眼小于1.0但好于0.67</li>
            <li>2.差眼矫正视力0.67-0.34</li>
            <li>3.差眼有大盲点和/或中度视野缺损和/或0.33-0.21</li>
            <li>4.差眼有明显视野缺损和/或视力0.2-0.1；3加上好眼小于等于0.33</li>
            <li>5.差眼少于0.1；4加上好眼小于等于0.33</li>
            <li>6.5加上好眼小于等于0.33</li>
        </ul>
        <h3>FS分数矫正</h3>
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>FS</td>
                    <td> 6</td>
                    <td> 5</td>
                    <td>4</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>转换后FS</td>
                    <td>4</td>
                    <td>3</td>
                    <td>3</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
p {
    margin-bottom: 0;
    padding-bottom: 5px;
}
</style>
