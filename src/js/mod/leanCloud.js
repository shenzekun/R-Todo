import AV from 'leancloud-storage'

let APP_ID = 'Rurjim7Hgz5o4c2pLEd5IKvu-gzGzoHsz';
let APP_KEY = 'fF5yjVpcDkrDoOeXX59z7UPl';
AV.init({appId: APP_ID, appKey: APP_KEY});

export const TodoModel = {

    getByUser(user, successFn, errorFn) {
        // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
        let query = new AV.Query('Todo');
        query.find().then((response) => {
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            });
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        });
    },

    /*创建一个todo
    * 参考https://leancloud.cn/docs/leanstorage_guide-js.html*/

    create({status, title, deleted}, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo');
        let todo = new Todo();
        todo.set('title', title);
        todo.set('status', status);
        todo.set('deleted', deleted);
        // 参考： https://leancloud.cn/docs/acl-guide.html#单用户权限设置
        // 这样做就可以让这个Todo 只被当前用户看到
        let acl = new AV.ACL();
        acl.setPublicReadAccess(false);//只有自己能看到
        acl.setWriteAccess(AV.User.current(), true);
        acl.setReadAccess(AV.User.current(), true);

        todo.setACL(acl);

        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        });
    },
    update({id, title, status, deleted}, successFn, errorFn) {
        // 参考： https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
        let todo = AV.Object.createWithoutData('Todo', id);
        title !== undefined && todo.set('title', title);
        status !== undefined && todo.set('status', status);
        deleted !== undefined && todo.set('deleted', deleted);
        // 为什么我要像上面那样写代码？
        // 考虑如下场景
        // update({id:1, title:'hi'})
        // 调用 update 时，很有可能没有传 status 和 deleted
        // 也就是说，用户只想「局部更新」
        // 所以我们只 set 该 set 的
        // 那么为什么不写成 title&&todo.set('title', title)呢,为什么要多此一举跟undefined做对比呢？
        // 考虑如下场景
        // update({id:1, title: '', status: null}}
        // 用户想将 title 和 status 置空，我们要满足
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => errorFn && errorFn.call(null, error))
    },

    /*输出todo
    文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象*/

    destroy(todoId, successFn, errorFn) {
        let todo = AV.Object.createWithoutData('Todo', todoId);
        todo.destroy().then(function (response) {
            successFn && successFn.call(null)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        });
    }
};

/*登录
* 参考：https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录*/

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null, user);
        document.location.reload();
    }, function (error) {
        errorFn.call(null, error)
    })
}

/*注册
* 参考：https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码注册*/

export function signUp(email, username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    let user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);
    // 设置邮箱
    user.setEmail(email);
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null, user);
        document.location.reload();
    }, function (error) {
        errorFn.call(null, error)
    });
    return undefined
}

/*
* 邮箱重置密码
* 参考：https://leancloud.cn/docs/leanstorage_guide-js.html#邮箱重置密码*/

export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call(null, success);
    }, function (error) {
        errorFn.call(null, error)
    })
}

/*
* 判断当前是否有用户
* 参考：https://leancloud.cn/docs/leanstorage_guide-js.html#当前用户 */

export function getCurrentUser() {
    let user = AV.User.current();
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

/*返回用户的信息*/

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}


/*
* 登出
* 参考：https://leancloud.cn/docs/leanstorage_guide-js.html#登出
* 返回值：undefined*/

export function signOut() {
    AV.User.logOut();
    return undefined
}

export default AV