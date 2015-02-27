(function() {
    /**
     * Criando o modulo da pagina de progresso
     *
     * Necessitamos para que a interatividade seja implementada
     * @type {Promisse}
     */
    var progress = angular.module('progress', []);

    /**
     * Criando o serice updAvg
     *
     * Necessitamos dele para poder manipular a lista de valores e atualizar a
     * media
     */
    progress.service('updAvg', function () {
        // Scope guard
        var _this = this,
            // Propriedade privada para a lista de valores
            // Necessitamos para poder alterar os valores e atualizar a media
            _list;

        // Criando propriedade list para nao poder ser lida externamente
        Object.defineProperties(this, {
            list: {
                set: function (l) {
                    _list = l;
                }
            }
        });

        // Media entre as progressbars
        this.avg = 0;

        /**
         * Metodo para atualizar a media
         * @param  {Object} pl Controller principal com a propriedade que queremos
         *                     atualizar
         */
        this.updateAvg = function (pl) {
            var avg = 0;

            _list.forEach(function (v, i) {
                avg += v.size;
            });

            pl.avg = _this.avg = avg / _list.length;
        }

        /**
         * Atualiza o valor na lista para poder atualizar a media
         * @param  {Number} val Novo valor para atualizar a lista
         * @param  {Number} i   Indice do objeto na lista
         */
        this.updateList = function (val, i) {
            _list[i].size = val;
        };
    });

    /**
     * Controller da lista de progressbars
     *
     * Necessita-mo-lo para controlar a lista de progressbars
     */
    progress.controller("ProgressListController", ['updAvg', function (updAvg) {
        // Scope guard
        var _this = this;

        // Passando a lista como propriedade para poder listar as progressbars
        this.progressList = list;

        // Passando a lista para o service tambem para que ele possa calcular a
        // media
        updAvg.list = list;

        // Atualizando a media
        updAvg.updateAvg(this);
    }]);

    /**
     * Controller para a barra de progresso
     *
     * Controla a barra de progresso, dado seu incremento, etc
     */
    progress.controller(
        'ProgressController',
        [
            // Requerindo o mo´dulo de interval
            '$interval',
            // Requerindo o serviço de update
            'updAvg',
            // Construtor do objeto
            function ($interval, updAvg) {
                // Scope guard
                var _this = this,
                    // Private property para o size da progressbar
                    _size,
                    // Private property para o controller da lista
                    _plc;

                // Definindo a propriedade publica
                Object.defineProperties(this, {
                    size: {
                        get: function() { return _size; },
                        set: function (v) {
                            // Ao setar o valor de size, atualiza o valor na lista
                            updAvg.updateList(v, _this.index);
                            // E, se tiver o controller da lista
                            if(_this.plc)
                                // Atualiza a media no controller
                                updAvg.updateAvg(_this.plc);
                            return _size = v;
                        }
                    }
                });

                // Propriedade para o ´indice do valor da progressbar na lista
                this.index = 0;
                // Valor minimo da progressbar
                this.min  = 0;
                // Valor maximo da progressbar
                this.max  = 100;

                /**
                 * Incrementa a progressbar
                 * @param  {Null|Number} i Se vier vazio, incrementa com 1, se 
                 *                         nao, incrementa com o valor que vier
                 */
                this.increase = function (i) {
                    i = (i || 1);

                    var isOverpass = (i + _this.size) > _this.max;

                    i =  overpass ? _this.max - _this.size : i;

                    _this.size += i;
                };

                /**
                 * Decrementa a progressbar
                 * @param  {Null|Number} d Se vier vazio, decrementa com 1, se
                 *                         nao, decrementa com o valor passado
                 */
                this.decrease = function (d) {
                    d = (d || 1);

                    var isLowerpass = (_this.size - i) < _this.min;

                    d =  isLowerpass ? _this.size : d;

                    _this.size -= d;
                };

                /**
                 * interval de teste, para incremento da progressbar
                 */
                var interval = $interval(function () {
                    _this.increase(getRandomInteger());
                    if(_this.size === _this.max)
                        $interval.cancel(interval);
                }, 1000);
            }
        ]
    );

})();