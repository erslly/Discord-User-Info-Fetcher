async function fetchUserInfo() {
    const discordId = document.getElementById('discordIdInput').value;
  
    if (!discordId) {
      alert("Lütfen bir Discord ID girin.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/getUserInfo?discordId=${discordId}`);
      const user = await response.json();
  
      document.getElementById('profile-card').style.display = 'block';
      
      document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${discordId}/${user.avatar}.png`;
      document.getElementById('username').innerText = user.username;

      const statusIndicator = document.getElementById('status-indicator');
      switch (user.status) {
        case 'online':
          statusIndicator.style.backgroundColor = 'green';
          break;
        case 'idle':
          statusIndicator.style.backgroundColor = 'yellow';
          break;
        case 'dnd':
          statusIndicator.style.backgroundColor = 'red';
          break;
        default:
          statusIndicator.style.backgroundColor = 'gray';
          break;
      }
  
      document.getElementById('badges').innerText = `Rozetler: ${user.badges.join(', ')}`;
      
      if (user.banner) {
        document.getElementById('banner').style.backgroundImage = `url(${user.banner})`;
      } else {
        document.getElementById('banner').style.backgroundColor = '#e3ded7';
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı", error);
    }
}

function addFriend() {
    const discordId = document.getElementById('discordIdInput').value;
  
    if (!discordId) {
        alert("Lütfen bir Discord ID girin.");
        return;
    }

    // Kullanıcıyı arkadaş olarak eklemek için gerekli olan Discord URL'si
    const addFriendUrl = `https://discord.com/users/${discordId}`;
    
    // URL'ye yönlendirme
    window.open(addFriendUrl, '_blank');
}
