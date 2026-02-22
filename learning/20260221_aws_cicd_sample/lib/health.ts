export function createHealth() {
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
    }
}