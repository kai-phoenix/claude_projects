import React from 'react'

interface StatusCardProps {
  loading: boolean
  error: string | null
  health: { status: string; timestamp: string; environment: string } | null
  onRetry: () => void
}

export default function StatusCard({ loading, error, health, onRetry }: StatusCardProps) {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>ヘルスチェック</h2>

      {loading && <p style={styles.loading}>読み込み中...</p>}

      {error && (
        <div style={styles.error}>
          <p style={styles.errorText}>❌ エラー: {error}</p>
          <button onClick={onRetry} style= {{ marginTop: '12px', padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          再試行
        </button>
        </div>
      )}

      {health && (
        <div style={styles.success}>
          <p style={styles.statusOk}>✅ ステータス: {health.status}</p>
          <p style={styles.timestamp}>時刻: {new Date(health.timestamp).toLocaleString('ja-JP')}</p>
          <p style={styles.timestamp}>環境: {health.environment}</p>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '32px',
  } as React.CSSProperties,
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1f2937',
  } as React.CSSProperties,
  loading: {
    color: '#6b7280',
    fontSize: '16px',
  } as React.CSSProperties,
  error: {
    backgroundColor: '#fee2e2',
    padding: '12px',
    borderRadius: '4px',
  } as React.CSSProperties,
  errorText: {
    color: '#dc2626',
    margin: 0,
  } as React.CSSProperties,
  success: {
    backgroundColor: '#dcfce7',
    padding: '12px',
    borderRadius: '4px',
  } as React.CSSProperties,
  statusOk: {
    color: '#16a34a',
    margin: '0 0 8px 0',
    fontWeight: '500',
  } as React.CSSProperties,
  timestamp: {
    color: '#15803d',
    margin: 0,
    fontSize: '14px',
  } as React.CSSProperties,
}
