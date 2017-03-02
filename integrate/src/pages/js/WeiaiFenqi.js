export default function(vm) {
    $(function() {
        var fenqi = {};
        var fenqimap7 = {
            'Tis-N0-M0': 'S0',
            'T1-N0-M0': 'IA',
            'T1a-N0-M0': 'IA',
            'T1b-N0-M0': 'IA',
            'T2-N0-M0': 'IB',
            'T1-N1-M0': 'IB',
            'T1a-N1-M0': 'IB',
            'T1b-N1-M0': 'IB',
            'T3-N0-M0': 'IIA',
            'T2-N1-M0': 'IIA',
            'T1-N2-M0': 'IIA',
            'T1a-N2-M0': 'IIA',
            'T1b-N2-M0': 'IIA',
            'T4a-N0-M0': 'IIB',
            'T3-N1-M0': 'IIB',
            'T2-N2-M0': 'IIB',
            'T1-N3-M0': 'IIB',
            'T1-N3a-M0': 'IIB',
            'T1-N3b-M0': 'IIB',
            'T1a-N3a-M0': 'IIB',
            'T1b-N3a-M0': 'IIB',
            'T1a-N3b-M0': 'IIB',
            'T1b-N3b-M0': 'IIB',
            'T4a-N1-M0': 'IIIA',
            'T3-N2-M0': 'IIIA',
            'T2-N3-M0': 'IIIA',
            'T2-N3a-M0': 'IIIA',
            'T2-N3b-M0': 'IIIA',
            'T4b-N0-M0': 'IIIB',
            'T4b-N1-M0': 'IIIB',
            'T4a-N2-M0': 'IIIB',
            'T3-N3-M0': 'IIIB',
            'T3-N3a-M0': 'IIIB',
            'T3-N3b-M0': 'IIIB',
            'T4b-N2-M0': 'IIIC',
            'T4b-N3-M0': 'IIIC',
            'T4b-N3a-M0': 'IIIC',
            'T4b-N3b-M0': 'IIIC',
            'T4a-N3-M0': 'IIIC',
            'T4a-N3a-M0': 'IIIC',
            'T4a-N3b-M0': 'IIIC',
            'X-X-M1': 'IV',
        }

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

        }

        function calcuFenqi7() {
            console.log(fenqi);
            var fq = '';
            if (fenqi.hasOwnProperty('fenqi7-M') && (fenqi['fenqi7-M'] == 'M1')) {
                fq = 'IV';
            // } else if (fenqi.hasOwnProperty('fenqi7-M') && fenqi['fenqi7-M'] == 'M0' && fenqi.hasOwnProperty('fenqi7-N') && fenqi['fenqi7-N'] == 'N3') {
            //     fq = 'IIIB';
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

            console.log('fq', fq);

            if (!fq) {
                vm.$children.forEach(function(one) {
                    if (one.hasOwnProperty('question') && one.question.ename == 'fenqi') {
                        one.picked = '';
                        return;
                    }
                })
            }

            var labelId = 'fenqi7-fenqi-' + fq;
            console.log('labelId', labelId);
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
