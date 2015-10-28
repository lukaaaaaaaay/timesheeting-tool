(function (angular, tst) {
    'use strict';

    /**
     * Provides a eventing mechanism which can broadcast and subscribe to application wide events.
     */
    angular.module(tst.modules.core.name).factory(tst.modules.core.services.eventbus, [
        '$rootScope',
        function ($rootScope) {
            /**
             * subscribe
             * 
             * Subscribes a callback to the given application wide event
             *
             * param {String}: eventName The name of the event to subscribe to.
             * param {Function}: callback A callback which is fire when the event is raised.
             * return {Function}: A function that can be called to unsubscrive to the event.
             */
            var subscribe = function (eventName, callback) {
                return $rootScope.$on(eventName, callback);
            },

            /**
             * broadcast
             * 
             * Broadcasts the given event and data.
             *
             * param {String}: eventName The name of the event to broadcast.
             * param {object}: data A data object that will be passed along with the event.
             */
            broadcast = function (eventName, data) {
                $rootScope.$emit(eventName, data);
            };

            return {
                subscribe: subscribe,
                broadcast: broadcast
            };
        }
    ]);
}(angular, tst));
