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
                 * Verifica se o input e um numero
                 * @param  {mixed}  i valor a ser testado
                 * @return {Boolean}   [description]
                 */
                function isNumber (i) {
                    if(!Number.isNumber(i))
                        throw new Error('O valor deve ser numerico');
                }

                /**
                 * Sanitiza a entrada para um numero positivo
                 * @param  {Number} i Numero a ser sanitizado
                 * @return {Number}   Numero positivo
                 */
                function sanitizeInput (i) {
                    isNumber(i);

                    return Math.abs(i);
                }

                /**
                 * Se e incremento acima do maximo
                 * @param  {Number}  i Incremento
                 * @return {Boolean}   Se e acima do maximo
                 */
                function isOverpass (i) {
                    return (i + _this.size) > _this.max;
                }

                /**
                 * Impede que o limite seja ultrapassado verificando se o
                 * incremento e maior que o limite
                 * @param  {Number} i Incremento
                 * @return {Number}   Se for maior que o limite, retorna o
                 *                       incremento ate ele, se nao, retorna o
                 *                       incremento normal
                 */
                function getIncrementValue (i) {
                    return isOverpass(i) ? _this.max - _this.size : i;
                }

                /**
                 * Incrementa a progressbar
                 * @param  {Null|Number} i Se vier vazio, incrementa com 1, se 
                 *                         nao, incrementa com o valor que vier
                 */
                this.increase = function (i) {
                    _this.size += getIncrementValue(sanitizeInput(i) || 1);
                };

                /**
                 * Verifica se o decremento e inferior ao minimo
                 * @param  {Number}  d Decremento
                 * @return {Boolean}   Se o decremento e inferior ao minimo
                 */
                function isLowerpass (d) {
                    return (_this.size - d) < _this.min;
                }

                /**
                 * Retorna o valor do decremento, impedindo de diminuir o valor
                 * abaixo o limite minimo
                 * @param  {Number} d decremento
                 * @return {Number}   Se for menor que o minimo, retorna o valor
                 *                       atual, se nao, o decremento
                 */
                function getDecrementValue(d) {
                    return isLowerpass(d) ? _this.size : d;
                }

                /**
                 * Decrementa a progressbar
                 * @param  {Null|Number} d Se vier vazio, decrementa com 1, se
                 *                         nao, decrementa com o valor passado
                 */
                this.decrease = function (d) {
                    _this.size -= getDecrementValue(sanitizeInput(d) || 1);
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