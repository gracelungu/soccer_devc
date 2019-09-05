let User;
let UID = null;
let currentGame = null;

async function login() {
  return await firebase.auth().signInAnonymously();
}

async function getUser() {
  const account = await firebase.auth().signInAnonymously();
  return account.user;
}

async function setUsername(username){
    const {uid} = await getUser();
    await firebase
    .database()
    .ref("games")
    .child(currentGame)
    .child(uid)
    .update({username});
}

async function getOrCreateSession() {
  console.log("UID", await login());
  const games = await firebase
    .database()
    .ref("games")
    .once("value");

  if (!games.val()) {
    const {
      user: { uid }
    } = await login();

    firebase
      .database()
      .ref("games")
      .push()
      .child(uid)
      .set({
        username: "none",
        uid,
        x: 0,
        y: 0,
        color: "blue",
        side: "left",
        state: "idle"
      });

    return games.val();
  }

  const keys = Object.keys(games.val());

  for (let key of keys) {
    if (Object.keys(games.val()[key]).length < 10) {
      const {
        user: { uid }
      } = await login();

      let color = 'blue';
      let side = 'left';

      if (Object.keys(games.val()[key]).length > 5){
        color = 'red';
        side = 'left';
      }

      firebase
        .database()
        .ref("games")
        .child(key)
        .child(uid)
        .set({
          username: "none",
          uid,
          x: 0,
          y: 0,
          color,
          side,
          state:'idle'
        });

      currentGame = key;

      return games.val();
    }
  }

  return games.val();
}

async function getPlayers() {
  const players = await getOrCreateSession();
  

  if(!players) return false;

  if (Object.keys(players).length == 1) {
    const key = Object.keys(players)[0];
    return players[key];
  }

  return players;
}
