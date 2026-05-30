interface ChartPlaceholderProps {
  title: string;
}

export default function ChartPlaceholder({ title }: ChartPlaceholderProps) {
  return (
    <div className="chart-container">
      <div className="chart-title">{title}</div>
      <div style={{ textAlign: 'center', color: '#9ca3af', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <p style={{ margin: 0, color: '#4b5563' }}>{title}</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0', color: '#9ca3af' }}>Chart will be rendered here</p>
        </div>
      </div>
    </div>
  );
}
