import {GET} from '@/app/api/health/route'

describe('/api/health route',()=> {
  it('returns ok payload',async()=>{
    const res = await GET()
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data.environment).toBeDefined()
    expect(new Date(data.timestamp).getTime()).toBeGreaterThan(0)
  })
})