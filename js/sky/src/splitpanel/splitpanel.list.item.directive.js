/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.item.directive', [])
        .directive('bbSplitpanelListItem', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.list.item.component.html',
                transclude: true,
                replace: true,
                restrict: 'A',
                controller: ['$scope', function ($scope) {
                    $scope.selectItem = function () {
                        var elem = angular.element('.bb-splitpanel-custom-content');
                        $scope.$parent.item.$index = $scope.$parent.$index;
                        $scope.bbSplitpanelContentGetPanelData({ arg: $scope.$parent.item });
                        if (elem) {
                            elem.addClass('bb-splitpanel-hidden');
                        }
                        elem = angular.element('.bb-listbuilder-toolbar-container');
                        if (elem) {
                            elem.addClass('bb-splitpanel-hidden');
                        }
                        elem = angular.element('.bb-splitPanel-pageHeader');
                        if (elem) {
                            elem.addClass('bb-splitpanel-hidden');
                        }
                        elem = angular.element('.split-panel-workspace');
                        if (elem) {
                            elem.removeClass('bb-splitpanel-hidden');
                        }
                    };
                }],
                scope: {
                    bbSplitpanelItemIsActive: '=?',
                    bbSplitpanelContentGetPanelData: '&?'
                }
            };
        });
})();