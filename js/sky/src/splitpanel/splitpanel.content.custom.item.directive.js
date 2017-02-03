/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.content.custom.item.directive', [])
        .directive('bbSplitpanelContentCustomItem', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.content.item.component.html',
                transclude: true,
                replace: true,
                restrict: 'A',
                controller: ['$scope', function ($scope) {
                    $scope.selectItem = function () {
                        $scope.$parent.item.$index = $scope.$parent.$index;
                        $scope.bbListbuilderContentGetPanelData({ arg: $scope.$parent.item });

                        var elem = angular.element('.bb-custom-content');
                        elem.addClass('bb-splitpanel-hidden');
                        //elem.hide("slide", { direction: "left" }, 500);

                        elem = angular.element('.bb-listbuilder-toolbar-container');
                        //elem.hide("slide", { direction: "left" }, 500);
                        elem.addClass('bb-splitpanel-hidden');

                        elem = angular.element('.bb-splitPanel-pageHeader');
                        //elem.hide("slide", { direction: "left" }, 500);
                        elem.addClass('bb-splitpanel-hidden');

                        elem = angular.element('.split-panel-workspace');
                        //elem.show("slide", { direction: "right" }, 800);
                        elem.removeClass('bb-splitpanel-hidden');
                        
                    };
                }],
                scope: {
                    bbSplitpanelItemIsActive: '=?',
                    bbListbuilderContentGetPanelData: '&?'
                }
            };
        });
})();