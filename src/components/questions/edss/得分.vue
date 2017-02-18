<template>
    <div class="edss-tip">
        <table class="table table-bordered table-striped">
            <tbody>
                <tr >
                    <td>0.0</td>
                    <td>所有FS均0</td>
                </tr>
                <tr>
                    <td>1.0 </td>
                    <td>1项FS为1</td>
                </tr>
                <tr >
                    <td>1.5</td>
                    <td>&gt;1项FS为1</td>
                </tr>
                <tr>
                    <td>2.0 </td>
                    <td>1项FS为2，其余为0或1</td>
                </tr>
                <tr >
                    <td>2.5 </td>
                    <td>2项FS为2，其余为0或1</td>
                </tr>
                <tr>
                    <td>3.0 </td>
                    <td>
                        1项FS为3，其余为0或1；
                        <br> 3-4项FS为2，其余为0或1
                    </td>
                </tr>
                <tr >
                    <td>3.5</td>
                    <td>
                        1项FS为3，1-2项FS为2，其余FS为0或1；
                        <br> 2项FS为3，其余为0或1；
                        <br> 5项FS为2，其余为0或1
                    </td>
                </tr>
                <tr>
                    <td>4.0</td>
                    <td>
                        独立行走 ≥500m，1项FS为4，其余为0或1
                    </td>
                </tr>
                <tr >
                    <td>4.5</td>
                    <td>
                        独立行走≥300m，1项FS为4
                    </td>
                </tr>
                <tr>
                    <td>5.0</td>
                    <td>独立行走≥200m，≥1项FS为5</td>
                </tr>
                <tr >
                    <td>5.5</td>
                    <td>独立行走≥100m</td>
                </tr>
                <tr>
                    <td>6.0-10.0</td>
                    <td>见行动能力</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered">
            <tbody>
                <tr >
                    <td>注：</td>
                </tr>
                <tr>
                    <td>EDSS &lt; 4：独立行走≥500m，精确的评分由FS决定。</td>
                </tr>
                <tr >
                    <td>EDSS4.0-5.0：精确评分由FS和行走范围共同决定。较为严重的参数决定EDSS的评分结果。</td>
                </tr>
                <tr>
                    <td>EDSS5.5-8.0：完全由行动能力决定</td>
                </tr>
                <tr >
                    <td>EDSS0-4.0：除非FS评分改变1分，否则EDSS评分改变不应为1</td>
                </tr>
                <tr>
                    <td>EDSS评分不得低于任何单独的FS评分，但视力和膀胱直肠功能除外</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
