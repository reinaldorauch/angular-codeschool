(function() {
    var app = angular.module('store', ['store-products']);


    app.controller('StoreController', ['$http', '$log', function ($http, $log) {
        var _this = this;

        this.products = [];

        $http.get('products.json')
            .success(function (data) {
                $log.info('success request');
                $log.info(data);
                _this.products = data;
            })
            .error(function (error) {
                $log.error('Error with the request');
                $log.error(error);
            });
    }]);

    app.controller("ReviewController", function() {
        var _this = this;

        this.review = {};

        this.addReview = function (product) {
            product.reviews.push(_this.review);
            this.review = {};
        }
    });

})();