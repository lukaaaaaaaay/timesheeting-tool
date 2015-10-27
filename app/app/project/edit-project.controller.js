(function () {
    'use strict';

    angular.module('tsm').controller('EditProjectCtrl', function ($scope, $location, $rootScope, tstBodyClass, Auth, Projects, Project, notifier, Users, $stateParams ) {
        var user = Auth.getCurrentUser();
        var empty = {};
        var company = {};
        var now = new Date();
        $scope.project = {};
        $scope.managers = [];
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            // set sidebar menu
            $rootScope.sidebarMenu.selected = 3;
            $rootScope.sidebarMenu.showDropdown = true;
            $rootScope.sidebarMenu.activeSubmenu = 2;

            // get active company
            //ActiveCompany.get({directorId: userId}, function (returned) {
                //company = returned;
                //TODO: filter out admin and directors....
                Users.findAllForCompany({id: user.companyId}, function (users) {
                    $scope.managers = users;
                }, function (error) {
                    notifier.error('Error', 'Unable to find users for company ' + user.companyId);    
                });
            // }, function (error) {
            //     notifier.error('Error', 'Unable to find company for logged in user. Try logging in again!');
            // });

            Project.get({id: $stateParams.id}, function (project) {
                $scope.project = project;
            }, function (error) {
                notifier.error('Error', 'Unable to find project ' + $stateParams.id);    
            });


        }    

        init();

        $scope.updateProject = function (form) {
            if(form.$valid) {
                Projects.update({id: $scope.project.id}, $scope.project, function (project) {
                    notifier.success('Success!', 'Project updated: ' + project.name);
                    form.$setPristine();
                    $scope.project = project;

                }, function (error) {
                    console.log(error);
                    notifier.error('Error!', 'Unable to update project');
                });
            }
            else {
                angular.forEach(form.$error.required, function(field) {
                    field.$setDirty();
                });
                notifier.error('Error!', 'There are validation errors with your form. Please correct before continuing.');
            }
        };

        $scope.validateDate = function(form, start, end) {
            // if(start) {
            //     if(start < now) {
            //         form.startDate.$setValidity('greaterThan', false);
            //     }
            //     else {
            //         form.startDate.$setValidity('greaterThan', true);
            //     }
            // }
            // // validate both
            if(end) {
                if(end <= start) {
                    form.dueDate.$setValidity('invalidDate', false);
                    form.startDate.$setValidity('invalidDate', false);
                }
                else {
                    form.dueDate.$setValidity('invalidDate', true);
                    form.startDate.$setValidity('invalidDate', true);
                }
            }

        };

    });
})();
