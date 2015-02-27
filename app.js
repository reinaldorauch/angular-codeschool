(function() {
    var app = angular.module('store', []);

    app.controller('StoreController', function () {
        this.products = gems;
    });

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

    progress.controller('ProgressController', function ($interval) {
        this.size = 1;

        this.increase = function (i) {
            this.size = this.size < 100 ? this.size + (i || 1) : this.size;
            console.log(this.size);
        };

        this.decrease = function (d) {
            this.size = this.size > 0 ? this.size - (d || 1) : this.size;
        };

        var _this = this;

        var interval = $interval(function () {
            console.log('INcreasing');
            _this.increase();
            if(_this.size === 100)
                $interval.cancel(interval);
        }, 1000);
    });

})();