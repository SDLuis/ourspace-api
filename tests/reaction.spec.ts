import { test, expect } from '@playwright/test'

let context: any

test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: 'http://localhost:5000'
  })
})

test.afterAll(async () => {
  await context.dispose()
})

test.describe('need auth', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('http://localhost:5000/auth/login', {
      data: {
        user: 'luis',
        password: 123
      }
    })
  })
  test('Add Reaction', async ({ request }) => {
    const reactionType: string = 'Amazed'
    await request.post('http://localhost:5000/reactions/add', {
      data: {
        Post_ID: 1,
        reactionType
      }
    })
    const reactions = await context.get('/reactions')
    expect(reactions.ok()).toBeTruthy()
    expect(await reactions.json()).toContainEqual(
      expect.objectContaining({
        reactionType
      })
    )
  })

  test('Remove reaction', async ({ request }) => {
    const reactionType: string = 'Amazed'
    const reaction = await context.get(`/reactions/test/${reactionType}`)

    expect(reaction.ok()).toBeTruthy()
    const getReaction = JSON.parse(await reaction.text())
    const ID: number = getReaction.Reaction_ID

    const res = await request.delete(`http://localhost:5000/reactions/delete/${ID}`)
    const status = await res.text()
    expect(status).toContain('Reaction removed successfully')
  })

  test('Api show corret info', async () => {
    const reactions = await context.get('/reactions')
    const ID: number = 1

    expect(reactions.ok()).toBeTruthy()
    expect(await reactions.json()).toContainEqual(
      expect.objectContaining({
        Reaction_ID: ID
      })
    )
  })

  test('Search reactions by Post ID', async () => {
    const ID: number = 1
    const reactions = await context.get(`/reactions/find/${ID}`)

    expect(reactions.ok()).toBeTruthy()
    expect(await reactions.json()).toContainEqual(
      expect.objectContaining({
        Post_ID: ID
      })
    )
  })
})
