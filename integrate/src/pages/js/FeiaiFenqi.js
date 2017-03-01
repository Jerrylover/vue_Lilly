export default function(vm) {
    $(function() {
        var fenqi = {};
        var fenqimap6 = {
            'Tx-N0-M0': 'Occult',
            'Tis-N0-M0': 'S0',
            'T1-N0-M0': 'IA',
            'T2-N0-M0': 'IB',
            'T1-N1-M0': 'IIA',
            'T2-N1-M0': 'IIB',
            'T3-N0-M0': 'IIB',
            'T1-N2-M0': 'IIIA',
            'T2-N2-M0': 'IIIA',
            'T3-N2-M0': 'IIIA',
            'T3-N1-M0': 'IIIA',
            'X-N3-M0': 'IIIB', //特殊判断一下
            'T4-X-M0': 'IIIB',
            'X-X-M1': 'IV',
        }
        var fenqimap7 = {
            'Tx-N0-M0': 'Occult',
            'Tis-N0-M0': 'S0',
            'T1a-N0-M0': 'IA',
            'T1b-N0-M0': 'IA',
            'T2a-N0-M0': 'IB',
            'T1a-N1-M0': 'IIA',
            'T1b-N1-M0': 'IIA',
            'T2a-N1-M0': 'IIA',
            'T2b-N0-M0': 'IIA',
            'T2b-N1-M0': 'IIB',
            'T3-N0-M0': 'IIB',
            'T1a-N2-M0': 'IIIA',
            'T1b-N2-M0': 'IIIA',
            'T2a-N2-M0': 'IIIA',
            'T2b-N2-M0': 'IIIA',
            'T3-N1-M0': 'IIIA',
            'T3-N2-M0': 'IIIA',
            'T4-N0-M0': 'IIIA',
            'T4-N1-M0': 'IIIA',
            'T4-N2-M0': 'IIIB',
            'X-N3-M0': 'IIIB', //特殊判断一下
            'X-X-M1a': 'IV',
            'X-X-M1b': 'IV'
            }
            //分期6
        $(document).on('change', '#fenqi6-T', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi6-T'] = name;
            calcuFenqi6();
        });
        $(document).on('change', '#fenqi6-N', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi6-N'] = name;
            calcuFenqi6();
        });
        $(document).on('change', '#fenqi6-M', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi6-M'] = name;
            calcuFenqi6();
        });

        //分期7
        $(document).on('change', '#fenqi7-T', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi7-T'] = name;
            calcuFenqi7();
        });
        $(document).on('change', '#fenqi7-N', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi7-N'] = name;
            calcuFenqi7();
        });
        $(document).on('change', '#fenqi7-M', function() {
            var name = $(this).find('option:selected').text().split(' ')[0];
            fenqi['fenqi7-M'] = name;
            calcuFenqi7();
        });

        function calcuFenqi6() {
            console.log(fenqi);
            var fq = '';
            if (fenqi.hasOwnProperty('fenqi6-M') && fenqi['fenqi6-M'] == 'M1') {
                fq = 'IV';
            } else if (fenqi.hasOwnProperty('fenqi6-M') && fenqi['fenqi6-M'] == 'M0' && fenqi.hasOwnProperty('fenqi6-N') && fenqi['fenqi6-N'] == 'N3') {
                fq = 'IIIB';
            } else if (fenqi.hasOwnProperty('fenqi6-M') && fenqi['fenqi6-M'] == 'M0' && fenqi.hasOwnProperty('fenqi6-T') && fenqi['fenqi6-T'] == 'T4') {
                fq = 'IIIB';
            } else {
                var key = ''
                if (fenqi.hasOwnProperty('fenqi6-T')) {
                    key += fenqi['fenqi6-T'];
                }
                if (fenqi.hasOwnProperty('fenqi6-N')) {
                    key += '-' + fenqi['fenqi6-N'];
                }
                if (fenqi.hasOwnProperty('fenqi6-M')) {
                    key += '-' + fenqi['fenqi6-M'];
                }

                console.log(key);
                if (fenqimap6.hasOwnProperty(key)) {
                    fq = fenqimap6[key];
                }
            }
            if (!fq) {
                vm.$children.forEach(function(one) {
                    if (one.hasOwnProperty('question') && one.question.ename == 'fenqi') {
                        one.picked = '';
                        return;
                    }
                })
            }
            var labelId = 'fenqi6-fenqi-' + fq;
            console.log('labelid', labelId);
            var labelIndex = 0;
            //让label选中
            $('label[_class="fenqi-label"]').each(function() {
                if ($(this).attr('_id') == labelId) {
                    var optionid = $(this).attr('optionid');
                    vm.$children.forEach(function(one) {
                        if (one.hasOwnProperty('question') && one.question.ename == 'fenqi') {
                            one.picked = optionid;
                        }
                    })
                }
            })
        }

        function calcuFenqi7() {
            console.log(fenqi);
            var fq = '';
            if (fenqi.hasOwnProperty('fenqi7-M') && (fenqi['fenqi7-M'] == 'M1a' || fenqi['fenqi7-M'] == 'M1b')) {
                fq = 'IV';
            } else if (fenqi.hasOwnProperty('fenqi7-M') && fenqi['fenqi7-M'] == 'M0' && fenqi.hasOwnProperty('fenqi7-N') && fenqi['fenqi7-N'] == 'N3') {
                fq = 'IIIB';
            } else {
                var key = ''
                if (fenqi.hasOwnProperty('fenqi7-T')) {
                    key += fenqi['fenqi7-T'];
                }
                if (fenqi.hasOwnProperty('fenqi7-N')) {
                    key += '-' + fenqi['fenqi7-N'];
                }
                if (fenqi.hasOwnProperty('fenqi7-M')) {
                    key += '-' + fenqi['fenqi7-M'];
                }

                console.log(key);
                if (fenqimap7.hasOwnProperty(key)) {
                    fq = fenqimap7[key];
                }
            }
            if (!fq) {
                vm.$children.forEach(function(one) {
                    if (one.hasOwnProperty('question') && one.question.ename == 'fenqi') {
                        one.picked = '';
                        return;
                    }
                })
            }
            var labelId = 'fenqi7-fenqi-' + fq;
            var labelIndex = 0;
            //让label选中
            $('label[_class="fenqi-label"]').each(function() {
                if ($(this).attr('_id') == labelId) {
                    var optionid = $(this).attr('optionid');
                    vm.$children.forEach(function(one) {
                        if (one.hasOwnProperty('question') && one.question.ename == 'fenqi') {
                            one.picked = optionid;
                        }
                    })
                }
            })
        }
    });
}
