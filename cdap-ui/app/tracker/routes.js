/*
 * Copyright © 2016 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

angular.module(PKG.name + '.feature.tracker')
  .config(function($stateProvider, MYAUTH_ROLE) {
    const productName = window.CaskCommon.ThemeHelper.Theme.productName;
    $stateProvider
      .state('home', {
        url: '/',
        template: '<ui-view/>',
        resolve: {
          rNsList: function (myNamespace) {
            return myNamespace.getList();
          }
        },
        controller: 'TrackerHomeController'
      })
      .state('ns', {
        url: '/ns/:namespace',
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: MYAUTH_ROLE.all,
          highlightTab: 'development'
        }
      })
      .state('tracker', {
        url: '?iframe&sourceUrl',
        abstract: true,
        parent: 'ns',
        template: '<ui-view/>'
      })

      .state('tracker.home', {
        url: '',
        data: {
          authorizedRoles: MYAUTH_ROLE.all,
          highlightTab: 'search'
        },
        templateUrl: '/assets/features/tracker/templates/main.html',
        controller: 'TrackerMainController',
        onEnter: function() {
          document.title = `${productName} | Search`;
        },
        controllerAs: 'MainController'
      })

      .state('tracker.detail', {
        url: '',
        data: {
          authorizedRoles: MYAUTH_ROLE.all,
          highlightTab: 'search'
        },
        templateUrl: '/assets/features/tracker/templates/container.html',
        controller: 'TrackerContainerController',
        controllerAs: 'ContainerController'
      })

        .state('tracker.detail.result', {
          url: '/search/:searchQuery/result',
          templateUrl: '/assets/features/tracker/templates/results.html',
          controller: 'TrackerResultsController',
          controllerAs: 'ResultsController',
          onEnter: function() {
            document.title = `${productName} | Search Results`;
          },
          data: {
            authorizedRoles: MYAUTH_ROLE.all,
            highlightTab: 'search'
          }
        })

        .state('tracker.detail.entity', {
          url: '/entity/:entityType/:entityId?searchTerm',
          templateUrl: '/assets/features/tracker/templates/entity.html',
          controller: 'TrackerEntityController',
          controllerAs: 'EntityController',
          onEnter: function($stateParams) {
            document.title = `${productName} | Search | ${$stateParams.entityId}`;
          },
          data: {
            authorizedRoles: MYAUTH_ROLE.all,
            highlightTab: 'search'
          }
        })
          .state('tracker.detail.entity.metadata', {
            url: '/summary',
            templateUrl: '/assets/features/tracker/templates/metadata.html',
            controller: 'TrackerMetadataController',
            controllerAs: 'MetadataController',
            onEnter: function($stateParams) {
              document.title = `${productName} | Search | ${$stateParams.entityId} | Summary`;
            },
            data: {
              authorizedRoles: MYAUTH_ROLE.all,
              highlightTab: 'search'
            }
          })
          .state('tracker.detail.entity.lineage', {
            url: '/lineage?start&end&method',
            templateUrl: '/assets/features/tracker/templates/lineage.html',
            controller: 'TrackerLineageController',
            onEnter: function($stateParams) {
              document.title = `${productName} | Search | ${$stateParams.entityId} | Lineage`;
            },
            controllerAs: 'LineageController',
            data: {
              authorizedRoles: MYAUTH_ROLE.all,
              highlightTab: 'search'
            }
          });
  });
