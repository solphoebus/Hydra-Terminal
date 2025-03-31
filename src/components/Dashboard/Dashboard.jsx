// Update the dashboard-content section
<div className="dashboard-content">
  <MemoriesTab entries={entries} />
  
  <div className="entries-list">
    {entries.map(entry => (
      // ... existing entry cards
    ))}
  </div>

  <TimeCapsule entries={entries} />
</div>