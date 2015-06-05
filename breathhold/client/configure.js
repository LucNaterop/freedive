Template.configure.helpers({
	'maxTime': function(){
		try{
			return transformTime(Meteor.user().profile.maxTime*10*1000);
		} catch(e) {};
	},
});

Template.configure.events({
	'change #maxTime': function(){
		var val = $('#maxTime').val();
		var profile = Meteor.user().profile;
		profile.maxTime = val;
		Meteor.users.update( {'_id': Meteor.user()._id}, {$set: { profile: profile }});
		stop();
	},

	'click #changebackward': function(){
		var profile = Meteor.user().profile;
		profile.CO2Mode = true;
		Meteor.users.update({'_id': Meteor.user()._id}, {$set: { profile: profile }});
		stop();
	},

	'click #changeforward': function(){
		var profile = Meteor.user().profile;
		profile.CO2Mode = false;
		Meteor.users.update({'_id': Meteor.user()._id}, {$set: { profile: profile }});
		stop();
	},

	'change #volume': function(){
		var val = $('#volume').val();
		var profile = Meteor.user().profile;
		profile.volume = val;
		Meteor.users.update( {'_id': Meteor.user()._id}, {$set: { profile: profile }});
	},

	'change #mute': function(){
		var profile = Meteor.user().profile;
		profile.muted = $('#mute')[0].checked;
		Meteor.users.update({'_id': Meteor.user()._id}, {$set: { profile: profile }});
	},

	'change #vibrate': function(){
		var profile = Meteor.user().profile;
		profile.vibrate = $('#vibrate')[0].checked;
		Meteor.users.update({'_id': Meteor.user()._id}, {$set: { profile: profile }});
	},
});

Template.configure.rendered = function(){
	var maxTime = Meteor.user().profile.maxTime;
	$('#maxTime').val(maxTime);
	var volume = Meteor.user().profile.volume;
	$('#volume').val(volume);
}

Accounts.onLogin(function(){
	if(!Meteor.user().profile){
		// first login we set default profile
		Meteor.users.update({'_id': Meteor.user()._id}, {$set: {profile: {
			maxTime: 9, 
			CO2Mode: true,
			volume: 0.5,
			muted: false,
			vibrate: false,
		}}});
		IonModal.open('readmore');
	}
	resetTable();
});
