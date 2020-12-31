import { removePrimativefromArr } from '.'

test('removes all primatives matching value for array of primatives', () => {
  expect(removePrimativefromArr('3', ['1', '2', '3', '3', '4'])).not.toContain(
    '3'
  )
  expect(removePrimativefromArr('3', ['1', '2', '3', '3', '4'])).toContain('4')
})
