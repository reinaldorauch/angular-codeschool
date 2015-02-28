(function () {
    'use strict';
    var app = angular.module('store-products', []);

    function PanelController() {
        this.tab = 1;

        this.selectTab = function (tab) {
           this.tab = tab;
        };

        this.isSelected = function (tab) {
            return this.tab === tab;
        };
    }

    app.directive('productPanels', function () {
        return {
            restrict: 'E',
            templateUrl: 'product-panels.html',
            controller: PanelController,
            controllerAs: 'panel'
        };
    });

    app.directive('productTitle', function(){
        return {
            restrict: 'E',
            templateUrl: 'product-title.html'
        };
    });
})();