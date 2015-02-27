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
})();