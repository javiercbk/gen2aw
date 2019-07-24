# gen2aw

This bad boy will help you transform this.

```js
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
```

Into this

```js
const Promise = require('bluebird');

const prom = Promise.resolve();

async function fun() {
    await prom;
    await fun();
    await fun.bind(this)(arg);
    await fun.bind(this)(arg, arg);
    await fun.bind(this)();
    await fun.cool.bind(fun)(arg);
    await fun.cool.bind(fun)(arg, arg);
    await fun.cool.bind(fun)();
    await fun.cool();
    await fun.cool(arg);
    await fun.cool(arg, arg);
};

const pepe = {
    async capo(arg) {
        await prom;
        await fun();
        await fun.bind(this)(arg);
        await fun.bind(this)(arg, arg);
        await fun.bind(this)();
        await fun.cool.bind(fun)(arg);
        await fun.cool.bind(fun)(arg, arg);
        await fun.cool.bind(fun)();
        await fun.cool();
        await fun.cool(arg);
        await fun.cool(arg, arg);
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
    async init() {
        await prom;
        await fun();
        await fun.bind(this)(arg);
        await fun.bind(this)(arg, arg);
        await fun.bind(this)();
        await fun.cool.bind(fun)(arg);
        await fun.cool.bind(fun)(arg, arg);
        await fun.cool.bind(fun)();
        await fun.cool();
        await fun.cool(arg);
        await fun.cool(arg, arg);
    }

    async double() {
        await fun1();

    }

    test() {
        console.log('pepe');
    }
}

```

##Disclaimer

`pepe` is a well known argentinean way to name a variable or a sample text when you don't really care about the outcome or you are writing something for tutorial purposes; much like `foo` or `bar`.
An study carried out by the university of Connecticut shows that typing `pepe` is 1.5 times faster than `foo` let alone `bar`; it also has antiaging properties and it might boost your creativity although further studies should be made to back this claim.
