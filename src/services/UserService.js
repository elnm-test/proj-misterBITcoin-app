import utilService from './utilService'

export default {
    getUser,
    signup,
    login,
    logout,
    addMove
}

var fakeData = [
    { serial: utilService.makeId(7), toId: "5a56640269f443a5d64b32ca", status: true, at: 2652712571, bitcoin: 2 },
    { serial: utilService.makeId(7), toId: "5a56640269f443a5d64b32ca", status: true, at: 2659992222, bitcoin: 7 },
    { serial: utilService.makeId(7), toId: "5a56640269f443a5d64b32ca", status: false, at: (new Date().getTime() - 1000 * 60 * 60 * 24), bitcoin: 100 },
    { serial: utilService.makeId(7), toId: "5a56640269f443a5d64b32ca", status: false, at: (new Date().getTime() - 1000 * 60 * 60 * 48), bitcoin: 100 },
    { serial: utilService.makeId(7), toId: "5a5664025f6ae9aa24a99fde", status: false, at: 265279999, bitcoin: 3 },
    { serial: utilService.makeId(7), toId: "5a5664025f6ae9aa24a99fde", status: true, at: 2649992222, bitcoin: 3 },
    { serial: utilService.makeId(7), toId: "5a56640252d6acddd183d319", status: true, at: (new Date().getTime()), bitcoin: 0.72 },
    { serial: utilService.makeId(7), toId: "5a56640252d6acddd183d319", status: false, at: 265279999, bitcoin: 3 },
    { serial: utilService.makeId(7), toId: "5a56640252d6acddd183d319", status: true, at: 2649992222, bitcoin: 3 },
    { serial: utilService.makeId(7), toId: "5a56640252d6acddd183d319", status: true, at: (new Date().getTime() - 1000 * 60 * 60 * 24), bitcoin: 10 },
    { serial: utilService.makeId(7), toId: "5a566402ed1cf349f0b47b4d", status: true, at: (new Date().getTime() - - 1000 * 60 * 60 * 24), bitcoin: 10 },

]



var gUsers = [];
var gCurrUser = _setLoggedInUser();
_loadUsers();


function _setLoggedInUser(){
    if(sessionStorage.loggedInUser) return utilService.loadFromSession('loggedInUser');
    return {}
}

async function _loadUsers() {
    var users = await utilService.loadFromLocal('users');
    if (!users) return _createUsers();
    gUsers = users;
}

function _createUsers() {
    var users = [
        {
            _id: utilService.makeId(), name: 'Shoko', email: 'shoko@gmail.com', password: 'shoko123', coins: 100, moves: fakeData
        },
        { _id: utilService.makeId(), name: 'Luli', email: 'luli@gmail.com', password: 'luli123', coins: 200, moves: fakeData },
        { _id: utilService.makeId(), name: 'Israel', email: 'israel@gmail.com', password: 'israel123', coins: 50, moves: [] }
    ]
    gUsers = users;
    return utilService.saveToLocal('users', users)
}



async function getUser() {
    if (sessionStorage.loggedInUser) return utilService.loadFromSession('loggedInUser')
    return gCurrUser;
}

function signup(user) {
    user._id = utilService.makeId();
    user.coins = 100;
    user.moves = [];
    gUsers.push(user);
    utilService.saveToLocal('users', gUsers)
    login(user);
    return user;
}


function _findUserByEmail(email) {
    var user = gUsers.find((user => { return user.email.toLowerCase() === email.toLowerCase() }))
    return user;
}

//Try Catch ?
function login(userCred) {
    const { email, password } = userCred;
    var user = _findUserByEmail(email);
    if (user) {
        if (user.password === password) {
            console.log('Correct User Details')
            utilService.saveToSession('loggedInUser', user);
            gCurrUser = user;
            // delete user.password;
            return user;
        }
    }
    return _handleUserRejection();
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    gCurrUser = {};
}

function _handleUserRejection() {
    console.log('Invalid Email Or Password')
    return;
}


function addMove(toId, status, ammount) {
    if(status) gCurrUser.coins = gCurrUser.coins - ammount;
    gCurrUser.moves.push({
        serial: utilService.makeId(7),
        toId,
        status,
        at: (new Date().getTime()),
        bitcoin: ammount
    })
    utilService.saveToSession('loggedInUser', gCurrUser);
    return status;
}