import React, { useState } from 'react';
import { collection, addDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from './firebase'; // Import Firebase config
import { useAuthState } from 'react-firebase-hooks/auth';
import trash from './assets/trash.svg'
import send from './assets/send.svg'
import { signOut } from 'firebase/auth'; // Import signOut

const Chat = () => {
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth); // Get the current user
  const [messagesSnapshot] = useCollection(
    query(collection(db, "messages"), orderBy("timestamp"))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (message === ""){
      alert("Please write a message")
    }
    // Prevent submission if the message is empty
    if (!trimmedMessage) {
      return; // Exit the function without sending the message
    }
  
    if (!user) return; // Ensure user is logged in

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid, // Store the user ID with the message
      photoURL: user.photoURL, // Store the user's photoURL
      displayName: user.displayName, // Store the user's displayName
      timestamp: new Date(),
    });
    setMessage("");

  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const handleSignOut = async () => {
    await signOut(auth); // Sign the user out
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Reuby's Messages</h2>
        {user && (
          <div className="user-info">
            <div className="user-profile">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User Profile" className="user-profile-img" />
              ) : (
                <div className="no-profile-picture">No Picture</div>
              )}
              <p>Welcome, {user.displayName || "User"}</p>
            </div>
            <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
          </div>
        )}
      </header>

     

      <div className="messages">
        {messagesSnapshot?.docs.map((doc) => (
          <div key={doc.id} className={`message-container ${doc.data().uid === user?.uid ? 'user-message-container' : 'other-message-container'}`}>
            <div className="message-info">
              {doc.data().photoURL ? (
                <img src={doc.data().photoURL} alt="Sender Profile" className="sender-profile-img" />
              ) : (
                <div className="no-profile-picture">No Picture</div>
              )}
              <p className="sender-name">{doc.data().displayName || "Anonymous"}</p>
            </div>
            <div className={`message ${doc.data().uid === user?.uid ? 'user-message' : 'other-message'}`}>
              <p>{doc.data().text}</p>
              {doc.data().uid === user?.uid && (
                <button onClick={() => handleDelete(doc.id)} className="delete-button"><img src={trash} alt="" /></button>
              )}
            </div>
          </div>
        ))}
      </div>
         <form onSubmit={handleSubmit} className="chat-form">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message here..."
          className="chat-input-field"
        />
          <button type="submit" className="send-button"><img src={send} alt="" /></button>
      </form>
    </div>
  );
};

export default Chat;
