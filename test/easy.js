const Promise = require('bluebird');

const prom = Promise.resolve();

function* fun() {
    yield prom;
    yield fun();
    yield Promise.coroutine(fun.bind(this))(arg);
    yield Promise.coroutine(fun.bind(this))(arg, arg);
    yield Promise.coroutine(fun.bind(this))();
    yield Promise.coroutine(fun.cool.bind(fun))(arg);
    yield Promise.coroutine(fun.cool.bind(fun))(arg, arg);
    yield Promise.coroutine(fun.cool.bind(fun))();
    yield Promise.coroutine(fun.cool)();
    yield Promise.coroutine(fun.cool)(arg);
    yield Promise.coroutine(fun.cool)(arg, arg);
};

const pepe = {
    *capo(arg) {
        yield prom;
        yield fun();
        yield Promise.coroutine(fun.bind(this))(arg);
        yield Promise.coroutine(fun.bind(this))(arg, arg);
        yield Promise.coroutine(fun.bind(this))();
        yield Promise.coroutine(fun.cool.bind(fun))(arg);
        yield Promise.coroutine(fun.cool.bind(fun))(arg, arg);
        yield Promise.coroutine(fun.cool.bind(fun))();
        yield Promise.coroutine(fun.cool)();
        yield Promise.coroutine(fun.cool)(arg);
        yield Promise.coroutine(fun.cool)(arg, arg);
    },
    async other() {
        await fun1();
    },
    test() {
        console.log('pepe');
    }
}

async function fun1() {
    await prom;
}

class Cool {
    * init() {
        yield prom;
        yield fun();
        yield Promise.coroutine(fun.bind(this))(arg);
        yield Promise.coroutine(fun.bind(this))(arg, arg);
        yield Promise.coroutine(fun.bind(this))();
        yield Promise.coroutine(fun.cool.bind(fun))(arg);
        yield Promise.coroutine(fun.cool.bind(fun))(arg, arg);
        yield Promise.coroutine(fun.cool.bind(fun))();
        yield Promise.coroutine(fun.cool)();
        yield Promise.coroutine(fun.cool)(arg);
        yield Promise.coroutine(fun.cool)(arg, arg);
    }

    async double() {
        await fun1();
        
    }

    test() {
        console.log('pepe');
    }
}