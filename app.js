var gems = [
    {
        name: "Dodecaedro",
        price: 2.85,
        description: 'E um Dodecaedro',
        canPurchase: true,
        soldOut: false
    },
    {
        name: "Pentagonal",
        price: 10.00,
        description: 'Pentagonal, not USA',
        canPurchase: false,
        soldOut: false
    }
];

var list = [1, 2, 3, 4, 5, 6, 7];

(function() {
    var app = angular.module('store', []);

    app.controller('StoreController', function () {
        this.products = gems;
    });

    app.controller('PanelController', function () {
        this.tab = 1;

        this.selectTab = function (tab) {
           this.tab = tab;
        };

        this.isSelected = function (tab) {
            return this.tab === tab;
        };
    });

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
            _this.increase(Math.round(Math.random() * 10));
            if(_this.size === _this.max)
                $interval.cancel(interval);
        }, 1000);
    });

})();