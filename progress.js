(function() {
    var progress = angular.module('progress', []);

    progress.service('updAvg', function () {
        var _this = this,
            _list;

        Object.defineProperties(this, {
            list: {
                set: function (l) {
                    _list = l;
                }
            }
        });

        this.avg = 0;

        this.updateAvg = function (pl) {
            var avg = 0;

            _list.forEach(function (v, i) {
                avg += v.size;
            });

            _this.avg = avg / _list.length;

            pl.avg = _this.avg;
        }

        this.updateList = function (val, i) {
            _list[i].size = val;
        };
    });

    progress.controller("ProgressListController", ['updAvg', function (updAvg) {
        var _this = this;

        this.progressList = list;

        updAvg.list = list;

        updAvg.updateAvg(this);
    }]);

    progress.controller('ProgressController', ['$interval', 'updAvg', function ($interval, updAvg) {
        var _this = this,
            _size,
            _plc;

        Object.defineProperties(this, {
            size: {
                get: function() { return _size; },
                set: function (v) {
                    updAvg.updateList(v, _this.index);
                    if(_this.plc)
                        updAvg.updateAvg(_this.plc);
                    return _size = v;
                }
            }
        });

        this.index = 0;
        this.min  = 0;
        this.max  = 100;

        this.increase = function (i) {
            i = (i + _this.size) > _this.max ? _this.max - _this.size : i;
            _this.size = _this.size < _this.max ? _this.size + (i || 1) : _this.size;
        };

        this.decrease = function (d) {
            i = (_this.size - i) < _this.min ? _this.size : i;
            _this.size = _this.size > _this.min ? _this.size - (d || 1) : _this.size;
        };

        var interval = $interval(function () {
            _this.increase(getRandomInteger());
            if(_this.size === _this.max)
                $interval.cancel(interval);
        }, 1000);
    }]);

})();