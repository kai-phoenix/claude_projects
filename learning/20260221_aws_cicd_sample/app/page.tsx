'use client'

import StatusCard from '@/components/StatusCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [health, setHealth] = useState<{ status: string; timestamp: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health')
        if (!res.ok) throw new Error('Health check failed')
        const data = await res.json()
        setHealth(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchHealth()
  }, [])

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>AWS CI/CD Sample</h1>
        <p style={styles.description}>
          GitHub Actions + CloudFormation + CodeDeploy による自動デプロイパイプライン
        </p>

        <StatusCard loading={loading} error={error} health={health} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>このアプリについて</h2>
          <ul style={styles.list}>
            <li>Next.js 14 で実装されたシンプルな Web アプリケーション</li>
            <li>GitHub Actions で自動テスト・ビルド・デプロイ</li>
            <li>CloudFormation で AWS インフラを IaC 管理</li>
            <li>Docker でコンテナ化し、ECR に push される</li>
            <li>CodeDeploy で EC2 に自動デプロイ</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>API エンドポイント</h2>
          <code style={styles.code}>GET /api/health</code>
          <p style={styles.description}>
            サーバーのヘルスチェックエンドポイント。常に <code style={styles.code}>{`status: "ok"`}</code> を返します。
          </p>
        </section>
      </div>
    </main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  container: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1f2937',
  },
  description: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  section: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'left' as const,
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1f2937',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  code: {
    backgroundColor: '#f3f4f6',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
  },
}
