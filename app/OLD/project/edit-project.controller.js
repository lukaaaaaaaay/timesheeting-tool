(function () {
    'use strict';

    function editProjectCtrl ($scope, $location, $rootScope, tstBodyClass, Status, Auth, Projects, Project, notifier, Users, $stateParams, ngDialog ) {
        var user = Auth.getCurrentUser();
        var empty = {};
        var company = {};
        var now = new Date();
        $scope.project = {};
        $scope.managers = [];
        $scope.statuses = [];
        // set body class
        $rootScope.bodyClass = tstBodyClass.returned.dashboard;

        function init() {
            // set sidebar menu
            $rootScope.sidebarMenu.selected = 3;
            $rootScope.sidebarMenu.showDropdown = true;
            $rootScope.sidebarMenu.activeSubmenu = 2;

            //TODO: filter out admin and directors....
            Users.findAllForCompany({id: user.companyId}, function (users) {
                $scope.managers = users;
            }, function (error) {
                notifier.error('Error', 'Unable to find users for company ' + user.companyId);    
            });
            
            Project.get({id: $stateParams.id}, function (project) {
                setProject(project);
                
            }, function (error) {
                notifier.error('Error', 'Unable to find project ' + $stateParams.id);    
            });

            Status.query({}, function (statuses) {
                $scope.statuses = statuses;
            }, function (error) {
                console.log(error);
                notifier.error('Error', 'Unable to retrieve system statuses');
            });
        }    

        function setProject (project) {
            $scope.project = project;
            $scope.project.startDate = new Date($scope.project.startDate.toString());
            $scope.project.dueDate = new Date($scope.project.dueDate.toString());
        }

        $scope.updateProject = function (form) {
            if(form.$valid) {
                Project.update({id: $scope.project.id}, $scope.project, function (project) {
                    notifier.success('Success!', 'Project updated: ' + project.name);
                    form.$setPristine();
                    setProject(project);

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

        $scope.deleteProject = function () {
            // show confirm dialog to ensure user really wants to delete something.
            ngDialog.openConfirm({
              template: '/components/dialogs/confirm-delete.html',
              scope: $scope 
            }).then(
                function(success) {
                    Project.delete({id: $scope.project.id}, function(success){
                            notifier.success('Success', 'Project deleted');
                            $location.path('/dashboard/projects');
                        },function(error) {
                            console.log(error);
                            notifier.error('Error', 'Unable to delete project');
                        });
                },
                function(error) {
                    // do nothing
                }
            );
        };

        init();
    }

    angular.module('tsm').controller('EditProjectCtrl', editProjectCtrl);
})();
