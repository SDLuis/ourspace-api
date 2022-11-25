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
  test('Add Comments', async ({ request }) => {
    const description: string = 'testing playwright'
    await request.post('http://localhost:5000/comments/add', {
      data: {
        Post_ID: 1,
        description
      }
    })
    const comments = await context.get('/comments')
    expect(comments.ok()).toBeTruthy()
    expect(await comments.json()).toContainEqual(
      expect.objectContaining({
        description
      })
    )
  })

  test('Edit comment', async ({ request }) => {
    const descriptionParam: string = 'testing playwright'
    const descriptionToEdit: string = 'edited playwright'
    const comment = await context.get(`/comments/test/${descriptionParam}`)

    expect(comment.ok()).toBeTruthy()
    const getComment = JSON.parse(await comment.text())
    const ID: number = getComment.Comment_ID

    await request.put(`http://localhost:5000/comments/edit/${ID}`, {
      data: {
        description: descriptionToEdit
      }
    })
    const commentAfter = await context.get('/comments')
    expect(commentAfter.ok()).toBeTruthy()
    const parseCommentAfter = JSON.parse(await commentAfter.text())
    expect(parseCommentAfter[0]).toHaveProperty('description', descriptionToEdit)
  })

  test('Delete comment', async ({ request }) => {
    const description: string = 'edited playwright'
    const comment = await context.get(`/comments/test/${description}`)

    expect(comment.ok()).toBeTruthy()
    const getComment = JSON.parse(await comment.text())
    const ID: number = getComment.Comment_ID

    const res = await request.delete(`http://localhost:5000/comments/delete/${ID}`)
    const status = await res.text()
    expect(status).toContain('Comment deleted')
  })

  test('Api show corret info', async () => {
    const comments = await context.get('/comments')
    const ID: number = 1

    expect(comments.ok()).toBeTruthy()
    expect(await comments.json()).toContainEqual(
      expect.objectContaining({
        Comment_ID: ID
      })
    )
  })

  test('Search comment by Post ID', async () => {
    const ID: number = 1
    const comments = await context.get(`/comments/find/${ID}`)

    expect(comments.ok()).toBeTruthy()
    expect(await comments.json()).toContainEqual(
      expect.objectContaining({
        Post_ID: ID
      })
    )
  })

  test('Owner comments', async ({ request }) => {
    const UserID = 1
    const comment = await request.get('http://localhost:5000/comments/owner')
    expect(await comment.json()).toContainEqual(
      expect.objectContaining({
        User_ID: UserID
      })
    )
  })
})
