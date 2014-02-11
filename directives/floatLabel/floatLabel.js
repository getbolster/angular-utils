var app = angular.module('app', []);

app.directive('floatLabel', ['$timeout', function($timeout){
    return {
        restrict: 'A',
        transclude: 'element',
        replace: true,
        priority: 9000,
        template: function(elem, attrs) {
            var id = Math.floor(Math.random()*90000) + 10000, // generate a pseudorandom 5-digit numerical id
                replacement =   '<div class="float-label">' +
                                '<label for="' + id + '">' + attrs.floatLabel + '</label>' +
                                '</div>';

            return replacement;
        },
        compile: function(elem, attrs) {
            if (attrs.ngModel) {
                attrs.ngModel = undefined;
                elem[0].removeAttribute(attrs.$attr.ngModel);
            }

            return {
                pre: function(scope, elem, attrs) {
                    attrs.ngModel = undefined;
                },
                post: function(scope, elem, attrs, controllers, transclude) {
                    // add generated id to input/textarea
                    transclude(scope, function(dom) {
                        var id = elem.children('label').attr('for'),
                            name = elem.children('label').html();

                        elem.prepend(dom);
                        elem.children(':first-child').attr('id', id);
                        elem.children(':first-child').attr('placeholder', name);
                    });

                    if('placeholder' in document.createElement('input')) { // or just use Modernizr.input.placeholder
                        // watch for changes in the input and add/remove class as necessary. WARNING: this function needs to be super lean, since it's bound to keyup
                        var childElem = elem.children(':first-child');

                        childElem.on('keyup', function () {
                            $timeout( function() {
                                if (childElem.val() !== '') {
                                    elem.addClass('has-value');
                                } else {
                                    elem.removeClass('has-value');
                                }
                            }, 0); // make sure this ALWAYS fires after the other stuff does
                        });

                        // add initial classes (and revalidate when ngModel changes)
                        // this could probably be cleaned up a bunch, but different browsers will fire these events at different times, and this catches them all
                        var myModel = childElem.controller('ngModel'),
                            setClass = function(value) {
                                if(!myModel.$modelValue || myModel.$modelValue === '' || isNaN(myModel.$modelValue) || myModel.$modelValue === null) {
                                    elem.removeClass('has-value');
                                } else {
                                    elem.addClass('has-value');
                                }
                                return value;
                            }

                        myModel.$formatters.push(setClass);
                    } else {
                        // fallback for ie9, always display label
                        elem.addClass('has-value');
                    }
                }
            }
        }
    };
}]);