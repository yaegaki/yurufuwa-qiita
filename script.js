(function (d, script) {
    function kanaToHira(str) {
        return str.replace(/[\u30a1-\u30f6]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60));
    }
    function yurufuwa(token) {
        // 数はそのまま
        if (token.pos_detail_1 === '数') {
            return token.surface_form;
        }

        return kanaToHira(token.reading);
    }

    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function () {
        const builder = kuromoji.builder({'dicPath': 'https://yaegaki.github.io/yurufuwa-qiita/bower_components/kuromoji/dict'});
        builder.build((e, tokenizer) => {
            if (e !== null) {
                console.warn(e);
                return;
            }

            document.querySelectorAll('.tr-Item_title').forEach(a => {
                a.innerHTML = tokenizer.tokenize(a.innerHTML).map(yurufuwa).join('');
            });
        });
    };
    script.src = 'https://yaegaki.github.io/yurufuwa-qiita/bower_components/kuromoji/build/kuromoji.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));