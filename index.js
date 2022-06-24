// ---- Var / Let / Const ---- //

// 5 5 5 5 5
// const list = [1, 2, 3, 4, 5];
// for (var item of list) {
//   setTimeout(
//     () => console.log(item),
//     item * 1000,
//   );
// }

// 1 2 3 4 5
// const list = [1, 2, 3, 4, 5];
// for (const item of list) {
//   setTimeout(
//     () => console.log(item),
//     item * 1000,
//   );
// }

// if (true) {
//   const x = 5; // unused
// }
// console.log(x); // undefined

// let x;
// if (true) {
//   x = 5;
// }
// console.log(x);

// ---- Destructuring ---- //

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//   },
// };

// console.log(obj.c.d);
// const x = obj.c.d;

// const { b } = obj;
// console.log(b);

// const { c: thing } = obj;
// console.log(thing);

// const { c: { d } } = obj;
// console.log(d);

// const arr = [1, 2, 3, 4, 5];

// const [first] = arr;
// console.log(first);
// const [,, third, fourth] = arr;
// console.log(third, fourth);

// const arr = [{ a: 1 }, { a: 2 }, { a: { b: 3 } }];
// const [
//   { a },
//   { a: b },
//   { a: { b: c } },
// ] = arr;
// console.log(a, b, c);

// ---- Rest (Spread) ---- //

// const arr = [1, 2, 3, 4, 5];
// const [first, , ...rest] = arr;
// console.log(first, rest);

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//   },
// };
// const { a, ...restObj } = obj;
// console.log({ a, restObj });

// const arr1 = [1, 2];
// const arr2 = [3, 4];
// const arr = [...arr1, 6, 5, 4, ...arr2, ...arr1];
// console.log(arr);

// const obj1 = { a: 1 };
// const obj2 = { b: 2 };
// const obj3 = { a: 3 };
// const obj4 = { a: { b: 5 } };
// const obj5 = { a: { c: 6, b: 2 } };
// const result1 = { ...obj1, ...obj2, c: 42 };
// const result2 = { ...obj1, ...obj3, c: 42 };
// const result3 = { ...obj5, ...obj4 };
// const result4 = { ...obj1, ...arr2 };
// console.log({
//   result1, result2, result3, result4,
// });

// ---- Types ---- //

// // primitives
// const x = 5;
// const y = '25';
// let z = true;
// console.log(z);
// z = false;
// console.log(z);
// z = 42;
// console.log(z);

// // complex
// const a = { a: 1 };
// let b = { b: 1 };
// console.log(b);
// b = a;
// console.log(b);
// a.a = 42;
// console.log(b);
// b = { ...a };
// console.log(b);
// a.a = 420;
// console.log(b);

// const a = { a: { b: 1 } };
// const b = { ...a };
// console.log(b);
// a.a.b = 42;
// console.log(b);

// ---- (Fat) arrow functions ---- //
// function thing() { return 420; }
// const thing2 = function () { return 42; };

// // eslint-disable-next-line
// const fat = () => { return 420};
// const fat2 = () => 42;

// ---- Scope of this ---- //
// const obj = {
//   a: 1,
//   do(...params) { console.log(this, this.a, params); },
// };
// // console.log(obj.do());
// // setTimeout(
// //   obj.do,
// //   0,
// // );
// const test = { a: 42 };
// obj.do.apply(test, [1, 2, 3, 4]);
// obj.do.call(test, 4, 3, 2, 1);
// const doTest = obj.do.bind(test);
// const fakeDoTest = (...params) => obj.do.call(test, ...params);
// doTest(6, 7, 8);
// fakeDoTest(0, 9, 8);

// ---- Callbacks and Promises + Async/Await ---- //
// function somethingCallback(
//   endpoint,
//   callback,
// ) {
//   if (Math.random() < 0.5) {
//     callback('nope');
//   } else {
//     callback(undefined, endpoint);
//   }
// }

// somethingCallback(
//   '/users',
//   (error, data) => {
//     if (error) {
//       console.error('error', error);
//     } else {
//       console.log('success', data);
//     }
//   },
// );

// fetch('/something')
//   .then(result => result.json())
//   .then(data => fetch('/something/else/${data.id}'))
//   .then(result => result.json())
//   .catch(err => console.error(err));

// const somethingPromise = (endpoint) => (
//   new Promise(
//     (accept, reject) => {
//       somethingCallback(endpoint, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           accept(data);
//         }
//       });
//     },
//   )
// );

// const somethingPromiseNative = (endpoint) => (
//   new Promise(
//     (yeah, nope) => {
//       if (Math.random() < 0.5) {
//         yeah(endpoint);
//       } else {
//         nope(new Error('nah'));
//       }
//     },
//   )
// );

// const somethingAsync = async (endpoint) => {
//   if (Math.random() < 0.5) {
//     throw new Error('nah');
//   }
//   return endpoint;
// };

// const getAllCommentsOfPostsOfUser = async (username) => {
//   const { id: userId } = await fetch('/users', { username });
//   const posts = await fetch('/posts', { author: userId });
//   // imperative
//   const mapping = {};
//   for (const { postId } of posts) {
//     const comments = await fetch('/comments', { post: postId });
//     mapping[postId] = comments;
//   }
//   // functional
// (await Promise.all(
//   posts.map(({ postId }) => fetch('/comments', { post: postId })
//     .then((comments) => ({ postId, comments }))),
// )).reduce(
//   (acc, { postId, comments }) => ({
//     ...acc,
//     [postId]: comments,
//   }),
//   {},
// );
//   return mapping;
// };

// const wait = (ms) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (Math.random() > 0.5) {
//       resolve(ms);
//     } else {
//       reject(new Error(`err${ms}`));
//     }
//   }, ms);
// });
// const waitAndLog = async (ms) => {
//   const result = await wait(ms);
//   console.log('resolve', result);
//   return result;
// };

//   console.log('start');
// try {
//   console.log('result', await Promise.any([
//     waitAndLog(3000),
//     waitAndLog(1000),
//     waitAndLog(2000),
//   ]));
// } catch (e) {
//   console.error('error', e);
// } finally {
//   console.log('end');
// }

// console.log('start');
// Promise.allSettled([
//   waitAndLog(3000),
//   waitAndLog(1000),
//   waitAndLog(2000),
// ])
//   .then(console.log.bind(console, 'result'))
//   .catch(console.error.bind(console, 'error'))
//   .finally(console.log.bind(console, 'end'));
