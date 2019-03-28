import * as types from './actionTypes';
import { storage } from 'firebase';


export function updateLastSeen (userID) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    	var db = getFirestore();
    	var user = db.collection("users").doc(userID);
        user.get().then(function(doc){
        	var lastTime = doc.data()['lastSeen']
        	var time = Date.now();
        	if (lastTime) {
	        	if (time - lastTime >= 5000) {
			    	user.update({lastSeen: time});
			    	dispatch({ type: types.UPDATE_LAST_SEEN, payload: time})
		    	}
        	} else {
        		user.update({lastSeen: time})
			    dispatch({ type: types.UPDATE_LAST_SEEN, payload: time})
        	}
	    })
    };
}

export function searchMsgs (search) {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({type: types.SEARCH_MESSAGES, payload: search })
	}
}

export function uploadImage (img) {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
	
		// var firebase = getFirebase()
		const fileName = img.file.name
		const db = getFirestore()
		const msgs = db.collection('messages').doc(img.roomName)
		console.log(fileName);

		
		var storageRef = storage().ref(`/images/` + fileName)
		
		storageRef.put(img.file).then((snapshot)=> {
			snapshot.ref.getDownloadURL().then(function(downloadURL) {
				console.log('File available at', downloadURL)
				
				
				msgs.get().then(function(doc){
					var existing = doc.data()['messages']
					console.log({existing});
					
					//msg,user, postedAt
					var newMessage = {
					  msg: "IMaGe " + downloadURL,
					  user: img.user.firstName,
					  postedAt: new Date()
					}
					existing.push(newMessage)
					console.log(existing);
					
					const newData = {
					  messages: existing
					}
					
					msgs.set(newData).then(function(){
					  console.log("newMessage added");
					})
				})
			  	dispatch({ type: types.NEW_MESSAGE, payload: img})
			})
			
		})

		
		
	};
}



export function updateUserList (user) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
		var db = getFirestore();
		
		var newChatDoc = db.collection("messages").doc(user.newCourseName);
		var oldChatDoc = db.collection('messages').doc(user.oldCourseName)

		const oldCourse = user.oldCourseName
		const newCourse = user.newCourseName
		const name = user.name

		oldChatDoc.get().then((doc) => {
			var msgData = doc.data()
			var userList = msgData['userList']


			if(!userList) {
				oldChatDoc.update({userList: []});
			} else {
				if (oldCourse != newCourse)
					var userIndex = userList.indexOf(name);
					userList.splice(userIndex, 1);
					oldChatDoc.update({userList: userList})
			}
		})


		newChatDoc.get().then((doc) => {
			var msgData = doc.data()
			var userList = msgData['userList']

			if(!userList) {
				newChatDoc.update({userList: [name]});
			} else {
				if (oldCourse != newCourse)
					userList.push(name)
					newChatDoc.update({userList: userList})
			}
		})


		dispatch({ type: types.UPDATE_USER_LIST })


    };
}