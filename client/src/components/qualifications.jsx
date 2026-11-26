import { Card, CardContent, Stack, Typography } from '@mui/material'

const qualifications = [
  {
    id: 1,
    title: 'Software Engineering - Artifical Intelligence',
    institution: 'Centennial College',
    period: '2025 – 2028',
    description: 'Foundational AI and Machine Learning, Data Engineering and Scalable Systems, Cutting-Edge AI Specializations, Cutting-Edge AI Specializations',
  },
  {
    id: 2,
    title: 'Machine Learning Specialist',
    institution: 'Stanford University',
    period: '2024 – 2025',
    description: 'Key skills, courses or results worth highlighting.',
  },
  {
    id: 3,
    title: 'Intro to Computer Science',
    institution: 'Harvard University',
    period: '2020 - 2021',
    description: 'Anything else a visitor should know about this qualification.',
  },
]

const Qualifications = () => (
  <Stack spacing={3} sx={{ maxWidth: 700, mx: 'auto', mt: 5 }}>
    <Typography component="h1" variant="h4" align="center" color="primary">Qualifications</Typography>
    {qualifications.length === 0 ? (
      <Typography align="center">No qualifications listed yet.</Typography>
    ) : (
      qualifications.map((item) => (
        <Card key={item.id} variant="outlined">
          <CardContent>
            <Typography component="h2" variant="h6">{item.title}</Typography>
            <Typography color="text.secondary">{item.institution}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>{item.period}</Typography>
            <Typography>{item.description}</Typography>
          </CardContent>
        </Card>
      ))
    )}
  </Stack>
)

export default Qualifications
