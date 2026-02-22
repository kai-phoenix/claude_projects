describe('/api/health', () => {
  it('should return ok status', async () => {
    const response = await fetch('http://localhost:3000/api/health')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data.timestamp).toBeDefined()
  })

  it('timestamp should be valid ISO string', async () => {
    const response = await fetch('http://localhost:3000/api/health')
    const data = await response.json()

    const timestamp = new Date(data.timestamp)
    expect(timestamp).toBeInstanceOf(Date)
    expect(timestamp.getTime()).toBeGreaterThan(0)
  })
})
