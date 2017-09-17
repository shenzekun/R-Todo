import AV from 'leancloud-storage'

var APP_ID = 'Rurjim7Hgz5o4c2pLEd5IKvu-gzGzoHsz';
var APP_KEY = 'fF5yjVpcDkrDoOeXX59z7UPl';
AV.init({appId: APP_ID, appKey: APP_KEY});

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
            let user = getUserFromAVUser(loginedUser)
            successFn.call(null, user)
        }, function (error) {
            errorFn.call(null, error)
        })
}
export function signUp(email, username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.setEmail(email)
    user
        .signUp()
        .then(function (loginedUser) {
            let user = getUserFromAVUser(loginedUser)
            successFn.call(null, user)
        }, function (error) {
            errorFn.call(null, error)
        })
    return undefined
}
export function sendPasswordResetEmail(email, successFn, errorFn){
      AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call() 
      }, function (error) {
        errorFn.call(null, error)
      })
    }
export function getCurrentUser() {
    let user = AV
        .User
        .current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

export function signOut() {
    AV
        .User
        .logOut()
    return undefined
}

export default AV