import test from 'ava'

import { demoAva } from '../js/modules/demo-ava'

test('demo', (t) => {
  t.is(demoAva(5, 5), 10)
})
