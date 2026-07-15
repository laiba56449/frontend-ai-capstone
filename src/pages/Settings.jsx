import { useState } from 'react'
import './Settings.css'

const STORAGE_KEY = 'user-settings'

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore invalid stored data
  }
  return { name: '', email: '' }
}

function Settings() {
  const [formData, setFormData] = useState(loadSettings)
  const [saved, setSaved] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    setSaved(true)
  }

  return (
    <main className="settings">
      <header className="settings__header">
        <h1>Settings</h1>
        <p>Update your profile information</p>
      </header>

      <form className="settings__form" onSubmit={handleSubmit}>
        <div className="settings__field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

        <div className="settings__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="settings__actions">
          <button type="submit" className="settings__submit">
            Save changes
          </button>
          {saved && (
            <p className="settings__feedback" role="status">
              Settings saved successfully.
            </p>
          )}
        </div>
      </form>
    </main>
  )
}

export default Settings
