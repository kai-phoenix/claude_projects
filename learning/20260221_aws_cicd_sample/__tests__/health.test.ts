import { createHealth } from '@/lib/health'

describe('createHealth',() => {
    it('returns ok status',() => {
        const result = createHealth()
        expect(result.status).toBe('ok')
        expect(result.timestamp).toBeDefined()
    })
    it ('timestamp is valid ISO string',()=>{
        const result = createHealth()
        const date =new Date(result.timestamp)
        expect(date.getTime()).toBeGreaterThan(0)
    })
})