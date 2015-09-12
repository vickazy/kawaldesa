﻿/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../gen/Models.ts"/>
/// <reference path="../../gen/Controllers.ts"/>
/// <reference path="IndexCtrl.ts"/>
/// <reference path="../KawalDesa.ts"/>


module App.Controllers {

    import Models = App.Models;
    import Controllers = App.Controllers.Models;

    class TransferRecapitulationCtrl {

        static $inject = ["$scope", "$upload"];

        indexCtrl: IndexCtrl;

        constructor(public $scope, public $upload) {
            var ctrl = this;
            this.indexCtrl = this.$scope.indexCtrl;
            $scope.$on('regionChangeBefore', function () {
                $scope.entities = [];
                $scope.isEntitiesLoading = true;
                ctrl.onRegionChanged();
            });
        }

        onRegionChanged() {
            if (this.indexCtrl.type == "transfer") {
                this.getRecapitulations(this.indexCtrl.regionId);
            }
        }


        getRecapitulations(parentId: string) {
            var ctrl = this;
            var scope = this.$scope;
            var query = {
                "SortOrder": "ASC",
                "ParentId": parentId,
                "ApbnKey": "2015p"
            }
            var type = Controllers.FrozenTransferRecapitulationController;
            if (this.indexCtrl.currentUser) {
                type = Controllers.TransferRecapitulationController;
            }
            scope.entities = [];
            if (this.indexCtrl.guessedRegionType < 4) {
                type.GetAll(query).then((recapitulations) => {
                    scope.entities = recapitulations.data.filter(r => r.RegionId != parentId);
                    if (this.indexCtrl.regionId == "0")
                        scope.entities = scope.entities.slice(0, 8);
                    scope.total = recapitulations.data.filter(r => r.RegionId == parentId)[0];
                }).finally(() => {
                    scope.isEntitiesLoading = false;
                });
            } else {
                var entities = [];
                for (var i = 0; i < 10; i++) {
                    Controllers.TransferController.GetAll({"fkRegionId": parentId, "Year": 2015 }).then(transfers => {
                        scope.entities = transfers.data;
                        scope.total = { "Dd": 2000000, "Add": 212100101, "Bhpr": 238349349 };
                    }).finally(() => {
                        scope.isEntitiesLoading = false;
                    });
                }
            }
        }


    }

    kawaldesa.controller("TransferRecapitulationCtrl", TransferRecapitulationCtrl);
}