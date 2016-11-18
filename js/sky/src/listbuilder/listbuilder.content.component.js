/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight) {

        var ctrl = this,
            lastSearchText;

        function addListbuilderView(newView) {
            ctrl.listbuilderCtrl.contentViews.push(newView);

            if ((ctrl.bbListbuilderContentActiveView && newView.viewName === ctrl.bbListbuilderContentActiveView) || 
                !ctrl.listbuilderCtrl.currentView) {
                ctrl.listbuilderCtrl.currentView = newView;
            } 
        }

        function removeListbuilderView(viewName) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews.splice(i, 1);
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        if (ctrl.listbuilderCtrl.contentViews.length > 0) {
                            ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[0];
                        } else {
                            ctrl.listbuilderCtrl.currentView = null;
                        }   
                        
                    }
                    return;
                }
            }
        }

        function highlightSearchContent(searchText) {
            var contentEl = $element.find('.' + ctrl.listbuilderCtrl.currentView.highlightClass);
            lastSearchText = searchText;
            /*istanbul ignore else */
            /* sanity check */
            if (contentEl.length > 0) {
                bbHighlight.clear(contentEl);
                if (searchText) {
                    bbHighlight(contentEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            }
        }

        function OnSelectedItem() {
            console.log("OnSelectedItem");
        }

        function getCurrentView() {
            return ctrl.listbuilderCtrl.currentView;
        }

        function setCurrentView(newView) {
            ctrl.listbuilderCtrl.currentView = newView;
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.bbListbuilderContentViewChanged)) {
                ctrl.bbListbuilderContentViewChanged({ newView: newView.viewName });
            }
        } 

        function setActiveView(viewName) {
            var i;

            if (ctrl.listbuilderCtrl.currentView && ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                return;
            }

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[i];
                    return;
                }
            }
        }

        function updateListbuilderView(viewName, newView) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews[i] = newView;
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        setCurrentView(newView);
                    }
                    return;
                }
            }
        }

        function onInit() {
            ctrl.listbuilderCtrl.highlightSearchContent = highlightSearchContent;
            ctrl.listbuilderCtrl.setCurrentView = setCurrentView;
            ctrl.highlightLastSearchText = ctrl.listbuilderCtrl.highlightLastSearchText;
            if (ctrl.bbListbuilderContentActiveView) {
                setActiveView(ctrl.bbListbuilderContentActiveView);
            }
        }

        function onChanges(changesObj) {
            var activeView;
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderContentActiveView) {
                activeView = changesObj.bbListbuilderContentActiveView;
                /* istanbul ignore else */
                /* sanity check */
                if (activeView.currentValue !== activeView.previousValue) {
                    setActiveView(activeView.currentValue);
                }
            }
        }

        function getPanelContent(selectedItem) {
            //we'll create new property in listBuilder controller for persist selectedItem's value
            //ctrl.listbuilderCtrl.bbListbuilderContentSelectedItem = selectedItem;

            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.bbListbuilderContentGetPanelData)) {
                ctrl.bbListbuilderContentGetPanelData({ bbListbuilderContentSelectedItem: selectedItem });
            }
        }


        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;
        
        ctrl.addListbuilderView = addListbuilderView;
        ctrl.removeListbuilderView = removeListbuilderView;
        ctrl.updateListbuilderView = updateListbuilderView;
        ctrl.getCurrentView = getCurrentView;
        ctrl.OnSelectedItem = OnSelectedItem;

    }

    Controller.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.listbuilder.content.component', ['sky.highlight'])
        .component('bbListbuilderContent', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            },
            bindings: {
                bbListbuilderContentActiveView: '@?',
                bbListbuilderContentSelectedItem: '@?',
                bbListbuilderContentViewChanged: '&?',
                bbListbuilderContentGetPanelData: '&?'
            }
        });

})();