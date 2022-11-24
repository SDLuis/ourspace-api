/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { test, expect } from '@playwright/test'
import bcrypt from 'bcrypt'

const HOST = 'http://localhost:5000'

test('All user', async ({ request }) => {
  const users = await request.get(`${HOST}/users`)
  expect(users.ok()).toBeTruthy()
  expect(await users.json()).toContainEqual(
    expect.objectContaining({
      First_Name: 'Luis',
      Last_Name: 'Tejeda'
    })
  )
})

test.describe('need auth', () => {
  test.beforeEach(async ({ request }) => {
    await request.post(`${HOST}/auth/login`, {
      data: {
        user: 'luis',
        password: '123'
      }
    })
  })

  test('Edit user', async ({ request }) => {
    const FirstName: string = 'Hansel'
    const LastName: string = 'Tejeda'
    const userParam: string = 'test'
    const userToEdit: string = 'edit'
    const user = await request.get(`${HOST}/users/find/${userParam}`)
    const parseUser = await user.json()
    const ID = parseUser.User_ID

    const res = await request.put(`${HOST}/users/edit/${ID}`, {
      data: {
        First_Name: FirstName,
        Last_Name: LastName,
        user: userToEdit,
        role: 'user',
        password: await bcrypt.hash('123', 8)
      }
    })
    expect(await res.text()).toContain('User Edit')
  })

  test('find user by user', async ({ request }) => {
    const userParam = 'test'
    const user = await request.get(`${HOST}/users/find/${userParam}`)
    expect(user.ok()).toBeTruthy()
    expect(await user.json()).toHaveProperty('user', userParam)
  })

  test('find user by id', async ({ request }) => {
    const id = 1
    const user = await request.get(`${HOST}/users/${id}`)
    expect(user.ok()).toBeTruthy()
    expect(await user.json()).toHaveProperty('User_ID', id)
  })

  test('Delete user', async ({ request }) => {
    const userParam: string = 'edit'
    const user = await request.get(`${HOST}/users/find/${userParam}`)
    const parseUser = await user.json()
    const ID = parseUser.User_ID
    const deleteUser = await request.delete(`${HOST}/users/delete/${ID}`)
    const res = await deleteUser.text()
    expect(res).toContain('User deleted')
  })
})
