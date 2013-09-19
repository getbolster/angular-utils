app.directive('blur', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if(!ngModel) return;
            ngModel.$setValidity('blur', true);

            var validator = function(value) {
                if(ngModel.$invalid) {
                    ngModel.$setValidity('blur', false);
                } else {
                    ngModel.$setValidity('blur', true);
                }
            }

            var checkAgain = function(value) {
                ngModel.$setValidity('blur', true);
            }

            element.bind('blur', function(){
                scope.$apply(
                    function(){
                        validator(ngModel.$modelValue);
                    }
                )
            });

            element.bind('focus', function() {
                scope.$apply(
                    function() {
                        checkAgain(ngModel.$modelValue);
                    }
                )
            });
        }
    }
})