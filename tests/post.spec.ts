import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

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
  test('Add Post', async ({ request }) => {
    const Location: string = 'testing playwight'
    const postType: string = 'Private'

    const file = path.join(__dirname, '../public/attachments', 'logo.webp')
    const image = fs.readFileSync(file)
    await request.post('http://localhost:5000/posts/add', {
      headers: {
        Accept: '*/*',
        ContentType: 'multipart/form-data'
      },
      multipart: {
        image: {
          name: file,
          mimeType: 'image/webp',
          buffer: image
        },
        Post_Type: postType,
        Location,
        description: 'World'
      }
    })
    const posts = await context.get('/posts')
    expect(posts.ok()).toBeTruthy()
    expect(await posts.json()).toContainEqual(
      expect.objectContaining({
        Location
      })
    )
  })

  test('Edit post', async ({ request }) => {
    const Location: string = 'testing playwight'
    const LocationToEdit: string = 'edited playwight'
    const postTypeToEdit: string = 'Private'
    const posts = await context.get(`/posts/test/${Location}`)

    expect(posts.ok()).toBeTruthy()
    const getPost = JSON.parse(await posts.text())
    const ID: number = getPost.Post_ID
    const file = path.join(__dirname, '../public/attachments', 'logo.webp')
    const image = fs.readFileSync(file)

    await request.put(`http://localhost:5000/posts/edit/${ID}`, {
      headers: {
        Accept: '*/*',
        ContentType: 'multipart/form-data'
      },
      multipart: {
        image: {
          name: file,
          mimeType: 'image/webp',
          buffer: image
        },
        Post_Type: postTypeToEdit,
        Location: LocationToEdit,
        description: 'World'
      }
    })
    const postsAfter = await context.get('/posts')
    expect(postsAfter.ok()).toBeTruthy()
    const parsepostAfter = JSON.parse(await postsAfter.text())
    expect(parsepostAfter[0]).toHaveProperty('Post_Type', postTypeToEdit)
    expect(parsepostAfter[0]).toHaveProperty('Location', LocationToEdit)
  })

  test('Delete post', async ({ request }) => {
    const Location: string = 'edited playwight'
    const posts = await context.get(`/posts/test/${Location}`)

    expect(posts.ok()).toBeTruthy()
    const getPosts = JSON.parse(await posts.text())
    const ID: number = getPosts.Post_ID

    const res = await request.delete(`http://localhost:5000/posts/delete/${ID}`)
    const status = await res.text()
    expect(status).toContain('Post deleted')
  })

  test('Api show corret info', async () => {
    const posts = await context.get('/posts')
    const ID: number = 1
    const postType: string = 'Public'

    expect(posts.ok()).toBeTruthy()
    expect(await posts.json()).toContainEqual(
      expect.objectContaining({
        Post_ID: ID,
        Post_Type: postType
      })
    )
  })

  test('Search post by User', async () => {
    const ID: number = 1
    const User: string = 'luis'
    const posts = await context.get(`/posts/user/${User}`)

    expect(posts.ok()).toBeTruthy()
    expect(await posts.json()).toContainEqual(
      expect.objectContaining({
        User_ID: ID
      })
    )
  })

  test('Owner posts', async ({ request }) => {
    const UserID = 1
    const posts = await request.get('http://localhost:5000/posts/owner')
    expect(await posts.json()).toContainEqual(
      expect.objectContaining({
        User_ID: UserID
      })
    )
  })

  test('Search posts by post type', async () => {
    const postType: string = 'Public'
    const posts = await context.get(`/posts/${postType}/list`)

    expect(posts.ok()).toBeTruthy()
    expect(await posts.json()).toContainEqual(
      expect.objectContaining({
        Post_Type: postType
      })
    )
  })
})
