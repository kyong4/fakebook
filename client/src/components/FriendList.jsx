import data from '../data';

function FriendList() {
  return (
    <div>
      <h1>My Friends:</h1>
      <ul>
        {data.friends&&data.friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;