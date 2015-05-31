Stylish.contactController = function($scope, $http) {
	$scope.formData = {
		name: "",
		email: "",
		telephone: "",
		message: ""
	};
	$scope.editable = ($scope.reqActive && $scope.status === -1);
	$scope.reqActive = false;
	$scope.status = 0;
	$scope.message = "";
	$scope.contactMe = function(){
		var successMessage = "Thanks for the message! I'm looking forward to working with you.",
			failureMessage = "There was an error sending your message. Please reach out to me by email, telephone, or LinkedIn.";
		if ($scope.reqActive){
			return;
		}
		$scope.reqActive = true;
		$http.post("mail",
					jQuery.param($scope.formData),
					{'headers': {'Content-Type': 'application/x-www-form-urlencoded'}}
		).success(function(data){
			$scope.status = parseInt(data);
			$scope.message = $scope.status > 0 ? successMessage : failureMessage;
		}).error(function(data){
			$scope.status = parseInt(data);
			$scope.message = failureMessage;
		}).then(function(){
				$scope.reqActive = false;
				jQuery(".contactStatus").show();
		})
	};
	$scope.closeFeedback = function() {
				jQuery(".contactStatus").hide();
	}
};

Stylish.controller('contactController', Stylish.contactController);