(function() {
    var progress = angular.module('progress', []);

    progress.controller("ProgressListController", function () {
        this.progressList = list;
    });

    progress.controller('ProgressController', function ($interval) {
        var _this = this;

        _this.size = 1;
        _this.min  = 0;
        _this.max  = 100;

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
    });

})();