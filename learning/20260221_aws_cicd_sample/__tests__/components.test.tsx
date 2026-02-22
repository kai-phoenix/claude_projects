import { render, screen } from '@testing-library/react'
import StatusCard from '@/components/StatusCard'

describe('StatusCard Component', () => {
  it('should display loading state', () => {
    render(<StatusCard loading={true} error={null} health={null} />)
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    render(<StatusCard loading={false} error="Connection failed" health={null} />)
    expect(screen.getByText(/Connection failed/)).toBeInTheDocument()
  })

  it('should display health status when data is available', () => {
    const mockHealth = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
    render(<StatusCard loading={false} error={null} health={mockHealth} />)
    expect(screen.getByText(/ok/)).toBeInTheDocument()
  })

  it('should render card title', () => {
    render(<StatusCard loading={true} error={null} health={null} />)
    expect(screen.getByText('ヘルスチェック')).toBeInTheDocument()
  })
})
