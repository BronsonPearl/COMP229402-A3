import { useState } from 'react'
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'

const emptyForm = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [sending, setSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const text = await response.text()
      let data = {}
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        data = {}
      }
      if (!response.ok) throw new Error(data.message || 'Failed to send message')
      setSuccess('Message sent. Thank you for getting in touch.')
      setForm(emptyForm)
    } catch (error) {
      setError(error.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <CardContent>
        <Typography component="h1" variant="h4" align="center" color="primary" gutterBottom>Contact</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField required label="Name" name="name" value={form.name} onChange={handleChange}
            autoComplete="name" />
          <TextField required label="Email" type="email" name="email" value={form.email} onChange={handleChange}
            autoComplete="email" />
          <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange}
            slotProps={{ htmlInput: { maxLength: 120 } }} />
          <TextField required multiline minRows={5} label="Message" name="message" value={form.message}
            onChange={handleChange} slotProps={{ htmlInput: { maxLength: 1000 } }}
            helperText={`${form.message.length}/1000`} />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button disabled={sending} type="submit" variant="contained">{sending ? 'Sending…' : 'Send message'}</Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Contact
