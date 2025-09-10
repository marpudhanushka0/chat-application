// Your Firebase config here — replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM Elements
const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

const messagesRef = db.ref('messages');

// Listen for new messages added to Firebase
messagesRef.on('child_added', (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement('div');
  msgDiv.textContent = `${data.username}: ${data.text}`;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto scroll down
});

// Send message to Firebase
sendBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (!username) {
    alert('Please enter your name');
    return;
  }
  if (!text) {
    alert('Please enter a message');
    return;
  }

  messagesRef.push({ username, text });
  messageInput.value = '';
});
