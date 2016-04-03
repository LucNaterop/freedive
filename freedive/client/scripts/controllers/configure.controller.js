
angular.module('freedive').controller('ConfigureController', function($scope, $reactive){
	$reactive(this).attach($scope);
	var self = this;

	var user 		= Users.findOne();
	self.maxTime 	= user.maxTime;
	self.volume 	= user.volume;
	self.mute 		= user.mute;
	self.vibrate 	= user.vibrate;
	
	self.sec60		= user.notificationMarks.indexOf(60) > -1;
	self.sec45		= user.notificationMarks.indexOf(45) > -1;
	self.sec30		= user.notificationMarks.indexOf(30) > -1;
	self.sec15		= user.notificationMarks.indexOf(15) > -1;
	self.sec10		= user.notificationMarks.indexOf(10) > -1;
	self.countfrom5 = user.notificationMarks.indexOf(5)  > -1;
	
	self.up = function(){
		self.maxTime = self.maxTime/1.0 + 10;
	}

	self.down = function(){
		self.maxTime = self.maxTime/1.0 - 10;
	}

	$scope.$on('$ionicView.beforeLeave', function(){

		var notificationMarks = [];
		if(self.sec60) notificationMarks.push(60);
		if(self.sec45) notificationMarks.push(45);
		if(self.sec30) notificationMarks.push(30);
		if(self.sec15) notificationMarks.push(15);
		if(self.sec10) notificationMarks.push(10);
		if(self.countfrom5){
			notificationMarks.push(5);
			notificationMarks.push(4);
			notificationMarks.push(3);
			notificationMarks.push(2);
			notificationMarks.push(1);
		}

		Users.update({'_id': Users.findOne()._id}, { $set: {
			'maxTime': 	self.maxTime,
			'volume': 	self.volume,
			'mute': 	self.mute,
			'vibrate': 	self.vibrate,
			'notificationMarks': notificationMarks

		}})

		Tables.update({'name': 'O2 Deprivation'}, {$set: {'durations': O2table() }});
		Tables.update({'name': 'CO2 Tolerance'}, {$set: {'durations': CO2table() }});
	});
});

