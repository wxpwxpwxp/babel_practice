const { compile } = require('../core/ast');

const code = `
import { ref } from 'vue';

let a = ref({
  a: 1,
  b: 2
});

a.value = 1
`;
const newCode = compile(code);


console.dir(newCode, {depth: null});
