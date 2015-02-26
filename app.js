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

})();